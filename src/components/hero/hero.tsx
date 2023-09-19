import {ReactNode} from 'react';
import image from '../../assets/AdobeStock_166338789_Preview 3.jpg';

const Hero = ({children, heading, subheading, className}: {children?: ReactNode, heading: string, subheading?: string, className?: string}) => {
    return (
        <div className='relative bg-gradient-to-r from-blue via-red via-30% to-transparent to-60% text-white py-28 px-14'>
            <img className='absolute inset-0 object-cover -z-10 w-full h-full' src={image.src} />
            <h1 className='text-hero'>{heading}</h1>
            {children}
        </div>
    )
}

export { Hero }