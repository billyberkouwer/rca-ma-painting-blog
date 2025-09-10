import "./post-tiles-wrapper.scss";

export default function PostTilesWrapper({children}: {children: React.ReactNode}) {
    return (
        <div className="post-tiles__wrapper">
            {children}
        </div>
    )
}