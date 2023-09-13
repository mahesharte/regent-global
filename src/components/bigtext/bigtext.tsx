import {ReactNode} from 'react';

const BigText = ({children, heading, subheading, className}: {children?: ReactNode, heading: string, subheading?: string, className?: string}) => {
    return (
        <div className='bg-gradient-to-r from-red to-blue text-center text-white py-28 px-14'>
            {subheading && <span className='uppercase text-xl'>{subheading}</span>}
            <h1 className='text-hero'>{heading}</h1>
            {children}
        </div>
    )
}

export { BigText }