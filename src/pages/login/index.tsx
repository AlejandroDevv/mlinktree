import { Link, useNavigate } from "react-router-dom";
import {Input} from '../../components/Input'
import { useState, type FormEvent } from "react";

import { auth } from '../../services/firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'
import background from '../../assets/fundo-tech.jpg'

export function Login(){
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e: FormEvent){
        e.preventDefault();

        if(email === "" || password === ""){
            alert("Preencha todos os campos!");
            return
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            console.log("Usuário logado com sucesso!");
            navigate("/admin", {replace : true})
        })
        .catch((error) => {
            alert('ERRO AO FAZER LOGIN')
            console.log(error)
            console.log("ERROR AO FAZER LOGIN")
        })
    }

    return(
        <div className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center"
             style={{
                backgroundImage: `url(${background})`
             }} >
            <div className='min-h-screen w-full backdrop-blur-sm bg-black/10 flex flex-col items-center'>    
                <Link to='/'>
                    <h1 className=" text-white font-bold text-5xl mb-6 mt-30">Dev
                    <span className="bg-linear-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">Link</span>
                    </h1>
                </Link>

                <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col px-2">
                    <Input
                        placeholder="Digite o seu email..."
                        type="email"
                        value={email}
                        onChange={ (e) => setEmail(e.target.value) }
                    />

                    <Input
                        placeholder="***********"
                        type="password"
                        value={password}
                        onChange={ (e) => setPassword(e.target.value) }
                    />

                    <button 
                    type="submit"
                    className=" h-9 bg-blue-600 rounded border-0 text-lg font-medium text-white cursor-pointer">
                        Acessar
                    </button>
                </form>
            </div>    
        </div>
    )
}