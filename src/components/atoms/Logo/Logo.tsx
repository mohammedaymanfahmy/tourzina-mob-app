import { Image } from 'react-native';

import LogoImage from '@/theme/assets/images/logo.png';

export type LogoProps = {
    width?: number; // Size for width, height will auto-scale to maintain aspect ratio if needed, or we can set both
    height?: number;
};

export default function Logo({ width = 120, height = 120 }: LogoProps) {
    // Assuming the logo is an image for now since we found a png.
    // Ideally we would use an SVG if available for better scaling.
    return (
        <Image
            source={LogoImage}
            style={{ width, height, resizeMode: 'contain' }}
        />
    );
}
