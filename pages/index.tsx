// import 'react-datepicker/dist/react-datepicker.css';

import { faCheese, faClock, faMapMarkerAlt, faSortNumericUp, faWeight } from '@fortawesome/free-solid-svg-icons';

import DatePicker from 'react-date-picker/dist/entry.nostyle';
// import DatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Head from 'next/head';
import router from 'next/router';
import styles from '../styles/Home.module.css';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

// import './index.css';

interface formData {
    password: string;
    time: number;
    timeUnit: string;
    views: number;
}

export default function Home() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [pickDate, setPickDate] = useState<Date>(new Date());

    const onSubmit = async (formData) => {
        // formData.time = formData.time != '' ? formData.time : '14';
        // formData.views = formData.views != '' ? formData.views : '10';

        const res = await fetch('/api/hello', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                values: {
                    password: formData.password,
                    expire_after_time: Number(formData.time),
                    expire_after_time_unit: formData.timeUnit,
                    expire_after_views: Number(formData.views),
                },
            }),
        });

        if (res.ok) {
            const json = await res.json();

            console.log(json);
            // router.push({
            //     pathname: '/password/url',
            //     query: { url_token: json.url_token },
            // });
        }
    };

    return (
        <div className={styles.div}>
            <Head>
                <title>Feed The Duck</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <h3>Feed The Duck</h3>
                What time the ducks are fed?
                <div className={styles.inputGroup}>
                    <span
                        style={{
                            width: '1%',
                            borderRight: 0,
                            borderBottomRightRadius: 0,
                            borderTopRightRadius: 0,
                        }}
                        className={styles.inputGroupAddon}
                    >
                        <FontAwesomeIcon icon={faClock} />
                    </span>
                    <DatePicker
                        clearIcon={null}
                        value={pickDate}
                        onChange={(date) => setPickDate(date)}
                    />
                </div>
                {errors.password && <span style={{ color: 'red' }}>* Please enter the password</span>}
                <div style={{ marginBottom: '13px' }} />
                What food the ducks are fed?
                <div className={styles.inputGroup}>
                    <span
                        style={{
                            width: '1%',
                            borderRight: 0,
                            borderBottomRightRadius: 0,
                            borderTopRightRadius: 0,
                        }}
                        className={styles.inputGroupAddon}
                    >
                        <FontAwesomeIcon icon={faCheese} />
                    </span>
                    <input
                        {...register('time')}
                        id="time"
                        style={{
                            borderRadius: 0,
                        }}
                        className={styles.formControl}
                        placeholder="14"
                        type="number"
                    />
                </div>
                Where the ducks are fed?
                <div className={styles.inputGroup}>
                    <span
                        style={{
                            width: '1%',
                            borderRight: 0,
                            borderBottomRightRadius: 0,
                            borderTopRightRadius: 0,
                        }}
                        className={styles.inputGroupAddon}
                    >
                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                    </span>
                    <input
                        {...register('views')}
                        id="views"
                        style={{
                            // borderRight: 0,
                            borderBottomRightRadius: 0,
                            borderTopRightRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderTopLeftRadius: 0,
                        }}
                        className={styles.formControl}
                        placeholder="... XXX National Park"
                        type="number"
                    />
                    <span
                        style={{
                            width: '1%',
                            // borderRight: 0,
                            borderBottomLeftRadius: 0,
                            borderTopLeftRadius: 0,
                        }}
                        className={styles.inputGroupAddon}
                    >
                        Views
                    </span>
                </div>
                How many ducks are fed?
                <div className={styles.inputGroup}>
                    <span
                        style={{
                            width: '1%',
                            borderRight: 0,
                            borderBottomRightRadius: 0,
                            borderTopRightRadius: 0,
                        }}
                        className={styles.inputGroupAddon}
                    >
                        <FontAwesomeIcon icon={faSortNumericUp} />
                    </span>
                    <input
                        {...register('views')}
                        id="views"
                        style={{
                            // borderRight: 0,
                            borderBottomRightRadius: 0,
                            borderTopRightRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderTopLeftRadius: 0,
                        }}
                        className={styles.formControl}
                        placeholder="... 10"
                        type="number"
                    />
                </div>
                How much food the ducks are fed?
                <div className={styles.inputGroup}>
                    <span
                        style={{
                            width: '1%',
                            borderRight: 0,
                            borderBottomRightRadius: 0,
                            borderTopRightRadius: 0,
                        }}
                        className={styles.inputGroupAddon}
                    >
                        <FontAwesomeIcon icon={faWeight} />
                    </span>
                    <input
                        {...register('ducks')}
                        id="Ducks"
                        style={{
                            // borderRight: 0,
                            borderBottomRightRadius: 0,
                            borderTopRightRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderTopLeftRadius: 0,
                        }}
                        className={styles.formControl}
                        placeholder="... 10"
                        type="number"
                    />
                    <div className={styles.inputGroupButton}>
                        <select
                            {...register('weightUnit')}
                            id="weightUnit"
                            style={{
                                width: 'auto',
                                borderBottomLeftRadius: 0,
                                borderTopLeftRadius: 0,
                            }}
                            className={styles.formControl}
                        >
                            <option value="g">gram</option>
                            <option value="lb">pound</option>
                            <option value="kg">kilogram</option>
                        </select>
                    </div>
                </div>
                <button className={styles.button}>Submit</button>
            </form>
        </div>
    );
}
