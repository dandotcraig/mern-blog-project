export default function Post({title, summary, cover, content }) {
    return (
        <div className="post">
            <div className="image">
                <img src="https://images.pexels.com/photos/15818869/pexels-photo-15818869/free-photo-of-person-riding-extremely-packed-bike.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="lady on bike" />
            </div>
            <div className="texts">
                <h2>{title}</h2>
                <p className="info">
                    <a className="author">{}</a>
                    <time>x</time>
                </p>
                <p className='summary'>{summary}</p>
            </div>
        </div>
    )
}