import './TrendCard.css'

interface Trend {
    name: string;
    shares: number;
}

const TrendCard: React.FC<Trend[]> = (data) => {
    data = Object.values(data)
    return (
        <div className="TrendCard">
            <h3>Trends for you</h3>
            {data.map((trend, id) => (
                <div className="trend" key={id}>
                    <span>#{trend.name}</span>
                    <span>{trend.shares}k shares</span>
                </div>
            ))}
        </div>
    );
}

export default TrendCard;