import './profile.css'
import { useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import React, { useEffect, useRef, useState } from "react"
import authorActions from "../../store/authors/actions"
import iconGps from "../../images/iconGps.png"
import iconDate from "../../images/iconDate.png"
import Swal from 'sweetalert2'


const { get_me, edit_author, delete_author } = authorActions

function AuthorProfile() {
    const authorStore = useSelector((store) => store.author)
    const author = authorStore.author
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const authorName = useRef(null);
    const authorLastName = useRef(null);
    const authorCity = useRef(null);
    const authorCountry = useRef(null);
    const authorDate = useRef(null);
    const authorPhoto = useRef(null);
    const user = JSON.parse(localStorage.getItem('user'))
    const [loaded, setLoaded] = useState(true);

    useEffect(() => {
        dispatch(get_me());      
    },[loaded]);

    const sendEdit = async (e) => {
        e.preventDefault();

        let values = {};
        if (authorName.current.value) {
            values.name = authorName.current.value;
        }
        if (authorLastName.current.value) {
            values.last_name = authorLastName.current.value;
        }
        if (authorCity.current.value) {
            values.city = authorCity.current.value;
        }
        if (authorCountry.current.value) {
            values.country = authorCountry.current.value;
        }
        if (authorDate.current.value) {
            values.date = authorDate.current.value;
        }
        if (authorPhoto.current.value) {
            values.photo = authorPhoto.current.value;
        }

        try {
            await dispatch(edit_author({ values }));
            Swal.fire({
              icon: 'success',
              title: 'Profile updated successfully',
              showConfirmButton: true,
              confirmButtonText: "Acept"
            });
            setLoaded(!loaded)
          } catch (error) {
            console.log("Error updating author");
          }
        }
        const sendDelete = async (e) => {
            e.preventDefault();
            try {
                await Swal.fire({
                    title: 'Are your sure you want to delete?',
                    text: 'This action can not be undone',
                    icon: 'warning',
                    showCancelButton: true,
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'No',
                    confirmButtonText: "Yes, i'm sure"
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        await dispatch(delete_author());
                        localStorage.setItem('user', JSON.stringify({...user, is_author: false}))
                        navigate("/", { replace: true });
                        await Swal.fire({
                            title: ':( See you soon, we will miss you',
                            confirmButtonText: "Acept"
                    })
                    }
                })
            } catch (error) {
                console.log("Error deleting author");
            }
        }

        return(
            <>
            {
                author?.active ? <div className='containerGeneral'>
                <div className='containerSuperior'>
                    <h1 className='profile-h1'>Profile</h1>
                </div>
                <div className='containerInferior'>

                    <div className='sectionLeft' >
                    <div className="signup-form-container">
                        <div className='profilePhoto'>
                        <img className='photoProfile' src={author.photo} alt="foto" />
                        </div>
                            <form className='form-profile'>
                            <div className="form-row">
                                <div className="form-signup-row">
                                <input
                                    ref={authorName}
                                    autoComplete="false"
                                    type="text"
                                    className="form-control"
                                    placeholder={author.name}
                                    id="name"
                                />
                                </div>
                                <div className="form-signup-row">
                                <input
                                    ref={authorLastName}
                                    autoComplete="false"
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    placeholder={author.last_name}
                                />
                                </div>
                                <div className="form-signup-row">
                                <input
                                    ref={authorCity}
                                    autoComplete="false"
                                    type="text"
                                    className="form-control"
                                    id="city"
                                    placeholder={author.city}
                                />
                                </div>
                                <div className="form-signup-row">
                                <input
                                    ref={authorCountry}
                                    autoComplete="false"
                                    type="text"
                                    className="form-control"
                                    id="country"
                                    placeholder={author.country}
                                />
                                </div>
                                <div className="form-signup-row">
                                    <input
                                    ref={authorDate}
                                    autoComplete="false"
                                    type="date"
                                    className="form-control"
                                    id="date"
                                    placeholder={author.date}
                                    />
                                </div>
                                <div className="form-signup-row">
                                    <input
                                    ref={authorPhoto}
                                    autoComplete="false"
                                    type="text"
                                    className="form-control"
                                    id="photo"
                                    placeholder='URL Profile image'
                                    />
                                </div>
                                </div>
                            <div>
                                <input className="save" type="button" 
                                onClick={sendEdit} 
                                value="Save" />
                                <input className="delete" type="button" onClick={sendDelete} value="Delete Account" />
                            </div>
                            </form>
                        </div>
                    </div>
                    <div className='sectionRigth'>
                        <div className='infoAuthor'>
                            <img className='photoProfile' src={author.photo} alt="foto" />
                                <div className='datosAthor'>
                                    <p>{author.name} {author.last_name}</p>
                                    <div className='localidad'>
                                        <img className="iconLocalidad" src={iconGps}alt="icono localidad"/>
                                        <p className='grey'>{author.city}, {author.country}</p>
                                    </div>
                                    <div>
                                        <p className='grey'>{author.date && (
                                            <>
                                                <img
                                                    className="iconCumple"
                                                    src={iconDate}
                                                    alt="icono cumpleaños"
                                                />
                                                {author.date.slice(0, 10)}
                                            </>
                                        )}</p>
                                    </div>
                                </div>

                        </div>

                    </div>

                </div>

            </div> 
            : <p>Aca pone algo</p>
            }
        </>
    )
}

export default AuthorProfile
