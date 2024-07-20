import { useState, useEffect } from "react";
const Memos = ({ state }) => {
    const [memos, setMemos] = useState([]);
    const { contract } = state;

    useEffect(() => {
        const fetchMemos = async () => {
            const memos = await contract.getMemo();
            setMemos(memos);
        };

        contract && fetchMemos();

    }, [contract]);
    return <>
        <p className="display-5" style={{ textAlign: "center", marginTop: "20px" }}>Contibutions</p>

        <table className="table container table-success table-bordered">
            <thead>
                <tr >
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Message</th>
                    <th scope="col">Timestamp</th>
                    <th scope="col" className="text-center">From</th>
                </tr>
            </thead>
            <tbody>
                {memos.map((memo, index) => (
                    <tr key={memo.name}>
                        <th scope="row">{index + 1}</th>
                        <td>{memo.name}</td>
                        <td>{memo.message}</td>
                        <td>{new Date(memo.timestamp * 1000).toLocaleString()}</td>
                        <td>{memo.from}</td>
                    </tr>
                ))}
            </tbody>
        </table>

    </>
}

export default Memos;