import React from 'react';

const Link = ({ href, children, className }) => {

    const onClickHelper = (event) => {
        if (event.metaKey || event.ctrlKey) {
            return;
        }

        event.preventDefault();
        window.history.pushState({}, '', href);

        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    }

    return (
        <a href={href} className={className} onClick={onClickHelper}>
            {children}
        </a>
    )
}

export default Link;