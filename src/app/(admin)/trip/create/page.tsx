'use client';

import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combo-box';
import { createSessionClient } from '@/lib/appwrite/client';
import { comboBoxItems, selectItems } from '@/lib/constants/app-constants';
import { world_map } from '@/lib/constants/world_map';
import { cn } from '@/utils/misc';
import { formatKey } from '@/utils/trip';
import { redirect } from 'next/navigation';
import { type FormEvent, useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const CreateTripPage = () => {
    const [countries, setCountries] = useState<Array<Country>>([]);

    useEffect(() => {
        const getCountries = async () => {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const data = await response.json();
            return data.map((country: unknown) => ({
                name: country.flag + country.name.common,
                coordinates: country.latlng,
                value: country.name.common,
                openStreetMap: country.maps?.openStreetMap,
            })) as Array<Country>;
        };
        getCountries()
            .then(data => setCountries(data))
            .catch(error => console.error('Error fetching countries:', error));
    }, []);

    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<TripFormData>({
        country: countries[0]?.name || '',
        travelStyle: '',
        budget: '',
        duration: 0,
        groupType: '',
        interest: '',
    });

    const [loading, setLoading] = useState(false);

    const countryData = countries?.map(country => ({
        label: country.name,
        value: country.value,
    }));

    const handleChange = (key: keyof TripFormData, value: string | number) => {
        setFormData(_prev => ({
            ..._prev,
            [key]: value,
        }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const _formDataValues = Object.values(formData);
        if (_formDataValues.some(_v => !_v)) {
            setError('Please provide all the values');
            setLoading(false);
            return;
        }

        if (formData.duration < 1 || formData.duration > 10) {
            setError('Duration must be between 1 and 10 days');
            setLoading(false);
            return;
        }

        const { account } = await createSessionClient();

        const user = await account.get();

        if (!user.$id) {
            console.error('User not authenticated');
            setLoading(false);
            return;
        }

        try {
            console.group('createTripHandleSubmit');
            console.log('user: ', user);
            console.log('formData: ', formData);
            console.groupEnd();

            const response = await fetch('/api/create-trip', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    country: formData.country,
                    numberOfDays: formData.duration,
                    travelStyle: formData.travelStyle,
                    interests: formData.interest,
                    budget: formData.budget,
                    groupType: formData.groupType,
                    userId: user.$id,
                }),
            });
            const result: CreateTripResponse = await response.json();

            if (result?.id) {
                redirect(`/trips/${result.id}`);
            } else {
                console.error('failed to generate a trip');
            }
        } catch (error) {
            console.error('Error generating trip: ', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="wrapper flex flex-col gap-10 pb-20">
            <Header
                title="Add a New Trip"
                description="View and edit AI Generated travel plans"
            />
            <section className="5 wrapper-md mt-2">
                <form className="trip-form" onSubmit={handleSubmit}>
                    <div className="">
                        <label htmlFor="country">Country</label>
                        <Combobox
                            data={countryData}
                            emptyText="No countries found."
                            onSelect={value => {
                                if (value) {
                                    handleChange('country', value);
                                }
                            }}
                            placeholder="Select a Country"
                            value={formData.country}
                        />
                    </div>
                    <div className="">
                        <label htmlFor="duration">Duration</label>
                        <input
                            type="number"
                            id="duration"
                            name="duration"
                            placeholder="Enter number of days"
                            className="form-input placeholder:text-gray-100"
                            min={1}
                            onChange={e =>
                                handleChange('duration', Number(e.target.value))
                            }
                        />
                    </div>
                    {selectItems.map(item => (
                        <div key={item}>
                            <label htmlFor={item}>{formatKey(item)}</label>
                            <Combobox
                                data={comboBoxItems[item].map(_item => ({
                                    label: _item,
                                    value: _item,
                                }))}
                                emptyText="No countries found."
                                onSelect={value => {
                                    if (value) {
                                        handleChange(item, value);
                                    }
                                }}
                                placeholder={`Select ${formatKey(item)}`}
                                value={formData?.[item].toString()}
                            />
                        </div>
                    ))}
                    <div className="">
                        <span className="text-gray-500">
                            Location on the world map
                        </span>
                        <ComposableMap
                            projection={'geoMercator'}
                            className=""
                            id="location">
                            <Geographies geography={world_map}>
                                {({ geographies }) =>
                                    geographies.map(geo => {
                                        return (
                                            <Geography
                                                key={geo.rsmKey}
                                                geography={geo}
                                                fill={
                                                    geo.properties.name ===
                                                    formData.country
                                                        ? '#EA382E'
                                                        : '#E5E5E5'
                                                }
                                                stroke="#FFFFFF"
                                            />
                                        );
                                    })
                                }
                            </Geographies>
                        </ComposableMap>
                    </div>
                    <div className="h-px w-full bg-gray-200" />
                    {error ? (
                        <div className="error">
                            <p>{error}</p>
                        </div>
                    ) : null}
                    <footer className="w-full px-6">
                        <Button
                            className="button-class h-12! w-full"
                            disabled={loading}
                            type="submit">
                            <img
                                src={`/assets/icons/${
                                    loading ? 'loader' : 'magic-star'
                                }.svg`}
                                alt="button icon"
                                className={cn('size-5', {
                                    'animate-spin': loading,
                                })}
                            />
                            <span className="p-16-semibold text-white">
                                {loading ? 'Generating...' : 'Generate Trip'}
                            </span>
                        </Button>
                    </footer>
                </form>
            </section>
        </main>
    );
};

export default CreateTripPage;
