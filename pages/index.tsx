import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from "axios";
import dayjs from 'dayjs';
// @ts-ignore
import zeropad from 'zeropad';
import timezone from 'dayjs/plugin/timezone';
import { Chart } from "react-google-charts";


const Home: NextPage = (props) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Precio de la electricidad para hoy en tiempo real</title>
                <meta name="description" content="Precio de la electricidad en España en tiempo real"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h1>Precio de la electricidad para hoy en tiempo real (bueno, cada hora)</h1>
                <Chart
                    chartType="LineChart"
                    // @ts-ignore
                    data={[["Hora", "Precio"], ...props.response]}
                    width="100%"
                    options={{
                        title: 'Precio de la luz (en €/MWh)',
                        curveType: 'function',
                        legend: { position: 'bottom' }
                    }}
                    height="400px"
                    legendToggle
                />
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16}/>
          </span>
                </a>
            </footer>
        </div>
    )
}

export const getStaticProps = async () => {
    const dateStart = dayjs().hour(1).minute(0).second(0);
    const dateEnd = dayjs().hour(24).minute(59).second(59);
    const url = `https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real?start_date=${dateStart.toISOString()}&end_date=${dateEnd.toISOString()}&time_trunc=hour`;
    const response = await axios.get(url);

    dayjs.extend(timezone)
    dayjs.tz.setDefault('Europe/Madrid')

    // @ts-ignore
    const data = response.data.included[0].attributes.values.map(({value, datetime}) => {
        return [`${zeropad(dayjs(datetime).get('h'))}:${zeropad(dayjs(datetime).get('m'))}`, value];
    })


    // Pass data to the page via props
    return {
        props: {
            response: data,
        },
        revalidate: 30,
    };
};

export default Home
