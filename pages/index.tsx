import { faCheese, faClock, faMapMarkerAlt, faSortNumericUp, faWeight } from '@fortawesome/free-solid-svg-icons';

import DatePicker from 'react-date-picker/dist/entry.nostyle';
import Dialog from '@material-ui/core/Dialog/Dialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Head from 'next/head';
import Typography from '@material-ui/core/Typography/Typography';
import styles from '../styles/Home.module.css';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

enum WEIGHT_UNIT {
    GRAM = 'gram',
    POUND = 'pound',
    KILOGRAM = 'kilogram',
}

interface formData {
    time: number;
    food: string;
    location: string;
    duck_quantity: number;
    food_quantity: number;
    weight_unit: WEIGHT_UNIT;
}

export default function Home() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [pickDate, setPickDate] = useState<Date>(new Date());
    const [dialog, setDialog] = useState<boolean>(false);

    const onSubmit = async (formData) => {
        console.log(Number(pickDate), formData);

        const res = await fetch('/api/insertEntry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                values: {
                    time: Number(pickDate),
                    food: formData.food,
                    location: formData.location,
                    duck_quantity: Number(formData.duck_quantity),
                    food_quantity: Number(formData.food_quantity),
                    weight_unit: formData.weight_unit,
                } as formData,
            }),
        });

        if (res.ok) {
            const json = await res.json();

            setDialog(true);
        }
    };

    return (
        <div className={styles.div}>
            <Head>
                <title>Feed The Duck</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Dialog open={dialog} onClose={() => setDialog(false)}>
                <Typography
                    style={{
                        padding: '2em',
                    }}
                >
                    Thank you for completing the survey.
                </Typography>
            </Dialog>
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
                        format={'y-MM-d'}
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
                        {...register('food')}
                        id="food"
                        style={{
                            borderBottomLeftRadius: 0,
                            borderTopLeftRadius: 0,
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
                        {...register('location')}
                        id="location"
                        style={{
                            // borderRight: 0,
                            borderBottomRightRadius: '5px',
                            borderTopRightRadius: '5px',
                            borderBottomLeftRadius: 0,
                            borderTopLeftRadius: 0,
                        }}
                        className={styles.formControl}
                        placeholder="... XXX National Park"
                        type="number"
                    />
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
                        {...register('duck_quantity')}
                        id="duck_quantity"
                        style={{
                            borderBottomRightRadius: '5px',
                            borderTopRightRadius: '5px',
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
                        {...register('food_quantity')}
                        id="food_quantity"
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
                            {...register('weight_unit')}
                            id="weight_unit"
                            style={{
                                background: '#dddfe0',
                                width: 'auto',
                                borderBottomLeftRadius: 0,
                                borderTopLeftRadius: 0,
                            }}
                            className={styles.formControl}
                        >
                            <option value={WEIGHT_UNIT.GRAM}>{WEIGHT_UNIT.GRAM}</option>
                            <option value={WEIGHT_UNIT.POUND}>{WEIGHT_UNIT.POUND}</option>
                            <option value={WEIGHT_UNIT.KILOGRAM}>{WEIGHT_UNIT.KILOGRAM}</option>
                        </select>
                    </div>
                </div>
                <button className={styles.button}>Submit</button>
            </form>
        </div>
    );
}
