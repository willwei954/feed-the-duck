import { faCheese, faClock, faMapMarkerAlt, faSortNumericUp, faWeight } from '@fortawesome/free-solid-svg-icons';

import DatePicker from 'react-date-picker/dist/entry.nostyle';
import Dialog from '@material-ui/core/Dialog/Dialog';
import { Divider } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Head from 'next/head';
import Typography from '@material-ui/core/Typography/Typography';
import styles from '../styles/Home.module.css';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

interface formData {
    time: number;
    food: string;
    location: string;
    duck_quantity: number;
    food_quantity: number;
}

interface formError {
    food: boolean;
    location: boolean;
    duck_quantity: boolean;
    food_quantity: boolean;
}

export default function Home() {
    const { handleSubmit } = useForm();

    const [pickDate, setPickDate] = useState<Date>(new Date());
    const [food, setFood] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [duck_quantity, setDuck_quantity] = useState<string>('');
    const [food_quantity, setFood_quantity] = useState<string>('');

    const [dialog, setDialog] = useState<boolean>(false);
    const [errors, setErrors] = useState<formError>({
        food: false,
        location: false,
        duck_quantity: false,
        food_quantity: false,
    });

    const handleOnchange = (e, setFunction) => {
        setFunction(e.target.value);
    };

    const validate = (): boolean => {
        let error = false;

        const temp_errors = {
            food: false,
            location: false,
            duck_quantity: false,
            food_quantity: false,
        };

        if (!food) {
            temp_errors.food = true;
            error = true;
        }
        if (!location) {
            temp_errors.location = true;
            error = true;
        }
        if (!duck_quantity) {
            temp_errors.duck_quantity = true;
            error = true;
        }
        if (!food_quantity) {
            temp_errors.food_quantity = true;
            error = true;
        }

        if (error) {
            setErrors(temp_errors);
        }
        return error;
    };

    const onSubmit = async (e) => {
        if (!validate()) {
            const res = await fetch('/api/insertEntry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    values: {
                        time: Number(pickDate),
                        food: food,
                        location: location,
                        duck_quantity: Number(duck_quantity),
                        food_quantity: Number(food_quantity),
                    } as formData,
                }),
            });

            if (res.ok) {
                const json = await res.json();

                resetState();
                setDialog(true);
            }
        }
    };

    const resetState = () => {
        setPickDate(new Date());
        setLocation('');
        setFood('');
        setDuck_quantity('');
        setFood_quantity('');

        setErrors({
            food: false,
            location: false,
            duck_quantity: false,
            food_quantity: false,
        });
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
            <form id="form" className={styles.form} onSubmit={handleSubmit(onSubmit)} onReset={resetState}>
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
                        id="food"
                        style={{
                            borderBottomLeftRadius: 0,
                            borderTopLeftRadius: 0,
                        }}
                        className={styles.formControl}
                        value={food}
                        onChange={(e) => handleOnchange(e, setFood)}
                        placeholder="... Bread Crumb"
                    />
                </div>
                {errors.food && (
                    <span style={{ color: 'red' }}>* Please enter what kind of food duck(s) has been fed</span>
                )}
                <Divider style={{ height: '0px', marginBottom: '13px' }} />
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
                        id="location"
                        style={{
                            // borderRight: 0,
                            borderBottomRightRadius: '5px',
                            borderTopRightRadius: '5px',
                            borderBottomLeftRadius: 0,
                            borderTopLeftRadius: 0,
                        }}
                        className={styles.formControl}
                        value={location}
                        onChange={(e) => handleOnchange(e, setLocation)}
                        placeholder="... XXX National Park"
                    />
                </div>
                {errors.location && <span style={{ color: 'red' }}>* Please enter where duck(s) has been fed</span>}
                <Divider style={{ height: '0px', marginBottom: '13px' }} />
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
                        id="duck_quantity"
                        style={{
                            borderBottomRightRadius: '5px',
                            borderTopRightRadius: '5px',
                            borderBottomLeftRadius: 0,
                            borderTopLeftRadius: 0,
                        }}
                        value={duck_quantity}
                        onChange={(e) => handleOnchange(e, setDuck_quantity)}
                        className={styles.formControl}
                        placeholder="... 10"
                        type="number"
                    />
                </div>
                {errors.duck_quantity && (
                    <span style={{ color: 'red' }}>* Please enter how many duck has been fed</span>
                )}
                <Divider style={{ height: '0px', marginBottom: '13px' }} />
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
                        id="food_quantity"
                        style={{
                            // borderRight: 0,
                            borderBottomRightRadius: 0,
                            borderTopRightRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderTopLeftRadius: 0,
                        }}
                        className={styles.formControl}
                        value={food_quantity}
                        onChange={(e) => handleOnchange(e, setFood_quantity)}
                        placeholder="... 10"
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
                        Grams
                    </span>
                </div>
                {errors.food_quantity && (
                    <span style={{ color: 'red' }}>* Please enter how much food duck(s) has been fed</span>
                )}
                <Divider style={{ height: '0px', marginBottom: '13px' }} />
                <button className={styles.button} type="submit">
                    Submit
                </button>
                <Divider style={{ height: '0px', marginBottom: '13px' }} />
                <button style={{ backgroundColor: 'lightblue' }} className={styles.button} type="reset">
                    Reset
                </button>
            </form>
        </div>
    );
}
