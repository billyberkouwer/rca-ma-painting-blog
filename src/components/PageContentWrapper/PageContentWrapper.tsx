import "./page-content-wrapper.scss"

export default function PageContentWrapper({children}: {children: React.ReactNode}) {
    return (
        <div className="page-content__wrapper">
            <div className="page-content__container">
                {children}
            </div>
        </div>
    )
}