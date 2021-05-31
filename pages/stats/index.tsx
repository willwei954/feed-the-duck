import EnhancedTable from '../components/EnhancedTable';
import styles from '../../styles/Stats.module.css';

function Status({ data }) {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <EnhancedTable data={data} />
            </div>
        </div>
    );
}

// SSR
export async function getServerSideProps() {
    const res = await fetch(`http://localhost:3000/api/getStats`, {
        method: 'GET',
    });
    const data = await res.json();

    // converting unix timestamp to readable time string upfront
    data.forEach((a) => {
        const t = new Date(Number(a.feed_time)).toDateString();
        a.feed_time = t;
    });

    return { props: { data } };
}

export default Status;
