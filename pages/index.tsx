import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from "axios";
import dayjs from 'dayjs';
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
                    data={[["Hora", "Precio"], ...props.response]}
                    width="100%"
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

    const data = response.data.included[0].attributes.values.map(({value, datetime}) => {
        return [`${zeropad(dayjs(datetime).get('h'))}:${zeropad(dayjs(datetime).get('m'))}`, value];
    })


    // Pass data to the page via props
    return {
        props: {
            // response: {
            //     "data": {
            //         "type": "Precios mercado peninsular en tiempo real",
            //         "id": "mer13",
            //         "attributes": {
            //             "title": "Precios mercado peninsular en tiempo real",
            //             "last-update": "2022-01-31T20:16:49.000+01:00",
            //             "description": null
            //         },
            //         "meta": {
            //             "cache-control": {
            //                 "cache": "MISS"
            //             }
            //         }
            //     },
            //     "included": [
            //         {
            //             "type": "PVPC (€\/MWh)",
            //             "id": "1001",
            //             "groupId": null,
            //             "attributes": {
            //                 "title": "PVPC (€\/MWh)",
            //                 "description": null,
            //                 "color": "#ffcf09",
            //                 "type": null,
            //                 "magnitude": "price",
            //                 "composite": false,
            //                 "last-update": "2022-01-31T20:16:49.000+01:00",
            //                 "values": [
            //                     {
            //                         "value": 269.75,
            //                         "percentage": 0.5641535083132908,
            //                         "datetime": "2022-02-01T00:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 254.72,
            //                         "percentage": 0.5702644010119328,
            //                         "datetime": "2022-02-01T01:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 256.65,
            //                         "percentage": 0.572496096364042,
            //                         "datetime": "2022-02-01T02:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 250.77,
            //                         "percentage": 0.5740151532492503,
            //                         "datetime": "2022-02-01T03:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 231.66,
            //                         "percentage": 0.5767995418668924,
            //                         "datetime": "2022-02-01T04:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 244.66,
            //                         "percentage": 0.5747779918244609,
            //                         "datetime": "2022-02-01T05:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 253.19,
            //                         "percentage": 0.5688001258059443,
            //                         "datetime": "2022-02-01T06:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 288.09,
            //                         "percentage": 0.5593003164495526,
            //                         "datetime": "2022-02-01T07:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 339.6,
            //                         "percentage": 0.5759837177747625,
            //                         "datetime": "2022-02-01T08:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 319.94,
            //                         "percentage": 0.5784173702384611,
            //                         "datetime": "2022-02-01T09:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 346.46,
            //                         "percentage": 0.6376955641450396,
            //                         "datetime": "2022-02-01T10:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 340.41,
            //                         "percentage": 0.6397962635792955,
            //                         "datetime": "2022-02-01T11:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 340.71,
            //                         "percentage": 0.6406611383764879,
            //                         "datetime": "2022-02-01T12:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 338.41,
            //                         "percentage": 0.640406487141154,
            //                         "datetime": "2022-02-01T13:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 269.8,
            //                         "percentage": 0.5853891384061273,
            //                         "datetime": "2022-02-01T14:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 247.66,
            //                         "percentage": 0.5902991300202599,
            //                         "datetime": "2022-02-01T15:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 273.02,
            //                         "percentage": 0.5884305357989568,
            //                         "datetime": "2022-02-01T16:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 302.83,
            //                         "percentage": 0.5826903465394161,
            //                         "datetime": "2022-02-01T17:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 409.55,
            //                         "percentage": 0.6256874847225617,
            //                         "datetime": "2022-02-01T18:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 414.82,
            //                         "percentage": 0.6211554011560002,
            //                         "datetime": "2022-02-01T19:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 411.13,
            //                         "percentage": 0.6201055806938159,
            //                         "datetime": "2022-02-01T20:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 381.1,
            //                         "percentage": 0.6276970715156307,
            //                         "datetime": "2022-02-01T21:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 285.4,
            //                         "percentage": 0.5794453242376254,
            //                         "datetime": "2022-02-01T22:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 282.16,
            //                         "percentage": 0.5824216653593692,
            //                         "datetime": "2022-02-01T23:00:00.000+01:00"
            //                     }
            //                 ]
            //             }
            //         },
            //         {
            //             "type": "Precio mercado spot (€\/MWh)",
            //             "id": "600",
            //             "groupId": null,
            //             "attributes": {
            //                 "title": "Precio mercado spot (€\/MWh)",
            //                 "description": null,
            //                 "color": "#df4a32",
            //                 "type": null,
            //                 "magnitude": "price",
            //                 "composite": false,
            //                 "last-update": "2022-01-31T14:02:15.000+01:00",
            //                 "values": [
            //                     {
            //                         "value": 208.4,
            //                         "percentage": 0.43584649168670925,
            //                         "datetime": "2022-02-01T00:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 191.95,
            //                         "percentage": 0.4297355989880673,
            //                         "datetime": "2022-02-01T01:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 191.65,
            //                         "percentage": 0.42750390363595814,
            //                         "datetime": "2022-02-01T02:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 186.1,
            //                         "percentage": 0.42598484675074966,
            //                         "datetime": "2022-02-01T03:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 169.97,
            //                         "percentage": 0.4232004581331076,
            //                         "datetime": "2022-02-01T04:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 181,
            //                         "percentage": 0.4252220081755392,
            //                         "datetime": "2022-02-01T05:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 191.94,
            //                         "percentage": 0.43119987419405564,
            //                         "datetime": "2022-02-01T06:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 227,
            //                         "percentage": 0.4406996835504476,
            //                         "datetime": "2022-02-01T07:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 250,
            //                         "percentage": 0.4240162822252374,
            //                         "datetime": "2022-02-01T08:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 233.19,
            //                         "percentage": 0.4215826297615389,
            //                         "datetime": "2022-02-01T09:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 196.84,
            //                         "percentage": 0.36230443585496047,
            //                         "datetime": "2022-02-01T10:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 191.65,
            //                         "percentage": 0.3602037364207044,
            //                         "datetime": "2022-02-01T11:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 191.1,
            //                         "percentage": 0.3593388616235122,
            //                         "datetime": "2022-02-01T12:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 190.02,
            //                         "percentage": 0.359593512858846,
            //                         "datetime": "2022-02-01T13:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 191.09,
            //                         "percentage": 0.4146108615938727,
            //                         "datetime": "2022-02-01T14:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 171.89,
            //                         "percentage": 0.4097008699797402,
            //                         "datetime": "2022-02-01T15:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 190.96,
            //                         "percentage": 0.4115694642010431,
            //                         "datetime": "2022-02-01T16:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 216.88,
            //                         "percentage": 0.41730965346058374,
            //                         "datetime": "2022-02-01T17:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 245.01,
            //                         "percentage": 0.3743125152774383,
            //                         "datetime": "2022-02-01T18:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 253,
            //                         "percentage": 0.3788445988439999,
            //                         "datetime": "2022-02-01T19:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 251.87,
            //                         "percentage": 0.379894419306184,
            //                         "datetime": "2022-02-01T20:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 226.04,
            //                         "percentage": 0.37230292848436936,
            //                         "datetime": "2022-02-01T21:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 207.14,
            //                         "percentage": 0.42055467576237465,
            //                         "datetime": "2022-02-01T22:00:00.000+01:00"
            //                     },
            //                     {
            //                         "value": 202.3,
            //                         "percentage": 0.4175783346406308,
            //                         "datetime": "2022-02-01T23:00:00.000+01:00"
            //                     }
            //                 ]
            //             }
            //         }
            //     ]
            // },
            response: data,
        },
        revalidate: 30,
    };
};

export default Home
