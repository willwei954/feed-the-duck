import EnhancedTable from '../components/EnhancedTable';
import styles from '../../styles/Stats.module.css';

function Status({ data }) {
    // Render data...
    console.log('--- data ---', data);
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <EnhancedTable data={data} />
            </div>
        </div>
    );
}

// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`http://localhost:3000/api/getStats`, {
        method: 'GET',
    });
    const data = await res.json();

    data.forEach((a) => {
        const t = new Date(Number(a.feed_time)).toDateString();
        a.feed_time = t;
    });

    // Pass data to the page via props
    return { props: { data } };
}

export default Status;
