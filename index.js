const express = require('express');
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

app.post('/send-email', async (req, res) => {
    const { invited } = req.body;

    try {
        const mailOptions = {
            from: "professorctrlplaytesteapi@gmail.com",
            to: "pedrohvidals@gmail.com",
            subject: "Convidado confirmado CTRL PLAY",
            text: `Por meio desse email estamos alertando que o convidade ${invited} confirmou sua participação na apresentação do trabalho dos alunos da CTRLPLAY!`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).send({ message: 'E-mail enviado com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Erro ao enviar e-mail.', error });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
