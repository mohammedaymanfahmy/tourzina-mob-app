import CountryFlag from 'react-native-country-flag';

type Props = {
    code: string;
    size?: number;
};

export default function FlagIcon({ code, size = 24 }: Props) {
    return <CountryFlag isoCode={code} size={size} />;
};