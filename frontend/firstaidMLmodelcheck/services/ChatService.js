import axios from 'axios';

const API_URL =
  'https://oye-ahmad1657-nisacare.hf.space/chat';

export const sendMessage = async (message) => {

    try {

        const response = await axios.post(
            API_URL,
            {
                message
            }
        );

        return response.data.reply;

    } catch (error) {

        console.log(error);

        return "معذرت، سروس دستیاب نہیں۔";
    }
};