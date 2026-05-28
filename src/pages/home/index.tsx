import {useEffect, useState} from 'react'
import {Social } from '../../components/social'
import {FaInstagram, FaLinkedin, FaTelegram} from 'react-icons/fa'
import {db} from '../../services/firebase'
import {
    getDocs,
    collection,
    orderBy,
    query,
    doc,
    getDoc
} from 'firebase/firestore'
import perfilImg from '../../assets/eu-dev-tech.jpg'
import background from '../../assets/fundo-tech.jpg'




interface LinkProps{
    id: string,
    name: string,
    url: string,
    bg: string,
    color: string;
}

interface SocialLinksProps{
    telegram: string;
    linkedin: string;
    instagram: string;
}


export function Home(){
    const [links, setLinks] = useState<LinkProps[]>([]);
    const [socialLinks, setSocialLinks] = useState<SocialLinksProps>();

    useEffect(() => {
        function loadLinks(){
            const linksRef = collection(db, "links")
            const queryRef = query(linksRef, orderBy("created","asc"))

            getDocs(queryRef)
            .then((snapshot) =>{
                const lista = [] as LinkProps[];

                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        name: doc.data().name,
                        url: doc.data().url,
                        bg: doc.data().bg,
                        color: doc.data().color
                    })
                })
                setLinks(lista);

            })
            .catch((error) => {
                console.log("ERRO FIREBASE", error)
            })

        }
        loadLinks();
    },[])

    useEffect(() => {
        function loadSocialLinks(){
            const docRef = doc(db, "social", "link")

            getDoc(docRef)
            .then((snapshot) => {
                if(snapshot.data() !== undefined){
                 setSocialLinks({
                    telegram: snapshot.data()?.telegram,
                    instagram: snapshot.data()?.instagram,
                    linkedin: snapshot.data()?.linkedin,
                })  
            }
        })
    }

    loadSocialLinks();

    }, [])
    return(
        <div className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center"
             style={{
                backgroundImage: `url(${background})`
             }}              
        >
            <div className='min-h-screen w-full backdrop-blur-sm bg-black/10 flex flex-col items-center'>
                <img
                src={perfilImg}
                alt='foto perfil'
                className='w-28 h-28 rounded-full object-cove mb-4 mt-20'
                />
                <h1 className="md:text-4xl text-3xl font-bold text-white">Alejandro Oliveira</h1>
                <span className="text-gray-50 mb-5 mt-3">Veja meus links 👇</span>

                <main className="flex flex-col w-11/12 max-w-xl text-center">
                    {links.map((link) => (
                        <section 
                        style={{ backgroundColor: link.bg}}
                        key={link.id}
                        className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer">
                        <a href={link.url} target='_blank'>
                            <p className="text-base md:text-lg" style={{ color: link.color}}>
                                {link.name}
                            </p>
                        </a>
                    </section>
                    ))}

                    {socialLinks && Object.keys(socialLinks).length > 0 && (
                        <footer className="flex justify-center gap-3 my-4">
                            <Social url={socialLinks?.telegram}>
                                <FaTelegram size={35} color='#FFF'/>
                            </Social>

                            <Social url={socialLinks?.instagram}>
                                <FaInstagram size={35} color='#FFF'/>
                            </Social>

                            <Social url={socialLinks?.linkedin}>
                                <FaLinkedin size={35} color='#FFF'/>
                            </Social>
                        </footer>
                        )}
                    </main>
                </div>
        </div>
    )
}