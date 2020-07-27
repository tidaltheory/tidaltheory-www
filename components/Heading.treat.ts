import { style } from 'treat'

export const heading = {
    1: style({
        margin: 0,
        fontSize: '6rem',
        fontFamily: 'Antenna, sans-serif',
        textTransform: 'uppercase',
        lineHeight: 1,
        padding: '0.05px 0',
        '::before': {
            display: 'block',
            height: 0,
            marginTop: '-0.0595208em',
            content: "''",
        },
        '::after': {
            display: 'block',
            height: 0,
            marginBottom: '-0.2005208em',
            content: "''",
        },
    }),
    2: style({
        fontSize: '4.5rem',
    }),
    3: style({
        fontSize: '3rem',
    }),
    4: style({
        fontSize: '2rem',
    }),
}
