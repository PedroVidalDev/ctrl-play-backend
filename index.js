const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "professorctrlplaytesteapi@gmail.com",
        pass: "vbzv qnnh hxrz kram",
    },
});

app.use(cors());

app.post('/send-email', async (req, res) => {
    const { name } = req.body;
    console.log("bateu aqui no endpoint");

    try {
        const mailOptions = {
            from: "professorctrlplaytesteapi@gmail.com",
            to: "isabelfranca76@gmail.com",
            subject: "Convidado confirmado CTRL PLAY",
            text: `Por meio dessa mensagem, informo que está confirmada a presença de "${name}" na feira da CTRL PLAY!`,
        };

        const mailOptionsTest = {
            from: "professorctrlplaytesteapi@gmail.com",
            to: "pedrohvidals@gmail.com",
            subject: "Convidado confirmado CTRL PLAY",
            text: `Por meio dessa mensagem, informo que está confirmada a presença de "${name}" na feira da CTRL PLAY!`,
        };

        await transporter.sendMail(mailOptions);
        await transporter.sendMail(mailOptionsTest);
        res.status(200).send({ message: 'E-mail enviado com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Erro ao enviar e-mail.', error });
    }
});

const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
