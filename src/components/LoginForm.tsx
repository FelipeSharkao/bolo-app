import axios from "axios"
import { createStore } from "solid-js/store"

export default function LoginForm() {
    const [args, setArgs] = createStore({
        email: "",
        password: "",
    })

    const handleSubmit = async () => {
        const response = await axios.post("/api/login", args).catch((err) => {
            console.error(err)
            return { data: { success: false } }
        })

        if (response.data?.success) {
            window.location.href = "/"
        }
    }

    return (
        <>
            <label for="email">Email</label>
            <input
                type="email"
                id="email"
                onChange={(ev) => setArgs({ email: ev.currentTarget.value })}
            />

            <label for="password">Senha</label>
            <input
                type="password"
                id="password"
                onChange={(ev) => setArgs({ password: ev.currentTarget.value })}
            />

            <button onClick={handleSubmit}>Entrar</button>
        </>
    )
}
