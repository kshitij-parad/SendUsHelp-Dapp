const ethers = require(`ethers`);

const Buy = ({ state }) => {
    const sendHelpAsap = async (event) => {
        event.preventDefault();

        const { contract } = state;

        const name = document.getElementById("name").value;
        console.log(name);
        const message = document.getElementById("message").value;

        const amount = { value: ethers.utils.parseEther("0.0001") };
        const transaction = await contract.sendHelpp(name, message, amount);
        await transaction.wait();
        alert("Transaction Successfull!!")
        console.log("transaction successfull");
        window.location.reload();

    };
        return <>
        <form className="container my-5 border border-primary p-3 rounded bg-secondary" onSubmit={sendHelpAsap}>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" id="name" />
            </div>
            <div className="mb-3">
                <label className="form-label">Message</label>
                <input type="text" className="form-control" id="message" />
            </div>
            <button type="submit" className="btn btn-danger border-primary text-center btn-lg" disabled={!state.contract}>Make Payment</button>
        </form>

    </>
}

export default Buy;