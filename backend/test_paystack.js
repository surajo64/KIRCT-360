import axios from 'axios';
import 'dotenv/config';

const test = async () => {
    try {
        const response = await axios.get(
            `https://api.paystack.co/transaction/verify/test_invalid_reference_123`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                },
            }
        );
        console.log("Success:", response.data);
    } catch (error) {
        console.error("Error from Paystack:", error.response?.status, error.response?.data);
    }
}

test();
