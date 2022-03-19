import React, {useState, useEffect} from 'react';
import * as userProfileService from "../../api/userprofile.service";
import * as postService from "../../api/post.service";
import * as communityService from "../../api/community.service";

export default function UpdateUserProfile(data) {
    const [firstName, setFirstName]= useState("");
    const [lastName, setLastName]= useState("");
    const [description, setDescription]= useState("");
    const [userIcon, setUserIcon]= useState("");
    const [posts, setPosts] = useState([]);

    const handleSubmit = async () => {
        let newUserInfo = { firstName, lastName, description, userIcon };
        let res = await userProfileService.update(newUserInfo).then(() => {
            setFirstName("");
            setLastName("");
            setDescription("");
            setUserIcon("");
            console.log("userprofile newuserinfo: ", newUserInfo)
        });
        if (!res === 201) {
            alert(`Error updating user information, ${res.status}`);
        }
    };

    const handleProfileDelete = async () => {
        console.log('in handleProfileDelete');
        let res = await userProfileService.destroy()
            .then(() => {
                // window.location.href = "/";
            });
         if ( !res === 201 ) {
             alert("Profile Not Deleted") 
         } 
    }        
    
    const getExistingProfile = async () => {
        let res = await userProfileService.show()
            .then((data) => {
            // console.log("get existing profile: ", data.data.data)
            setFirstName(data.data.data.firstName);
            setLastName(data.data.data.lastName);
            setDescription(data.data.data.description);
            setUserIcon(data.data.data.setUserIcon)
        })

    }



    const handleSubmitDelete = async () => {
        let res = await postService.destroy()
            // .then(() => {
            //     // window.location.href = "/post";
            // });
        
         if ( !res === 201 ) {
             alert(`Post error. Please submit again. ${res.status}`) 
         } 
    }        

    const handleSubmitEdit = async () => {
        // window.location.href = `/${post}/${id}`;
    
    //  if ( !res === 201 ) {
    //      alert(`Post error. Please submit again. ${res.status}`) 
    //  } 
} 
    
    const findPosts = async () => {
        await postService.getAll().then((res) => {
            console.log(res.data.data)
            setPosts(res.data.data);
        });
    }
    useEffect(() => {
        findPosts();
        getExistingProfile();
    }, []);



return (
    <div>
        <h1>Update your Public Profile</h1>
    <form>
        <label>
            Would you like to change your First and/or Last name?
            <input
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                type="text"
                name="firstName"
                placeholder={firstName}
            />
        </label>
        <label>
            <input
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                type="text"
                name="lastName"
                placeholder="input your new last name"
            />
        </label>
        <label>
            Would you like to change your description?
            <input
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                type="text"
                name="description"
                placeholder="tell everyone a little bit about yourself"
            />
        </label>
        <label>
            Would you like to change your User Icon?
            <textarea
                onChange={(e) => setUserIcon(e.target.value)}
                value={userIcon}
                type="text"
                name="userIcon"
                placeholder="input your new image, please use .jpg or .png"
            />
        </label>
        
    </form>
    <button onClick={handleSubmit}>Update user profile information</button>
    <p> Would you like to delete your profile?</p>
    <button onClick={handleProfileDelete}>Delete Profile</button>
        <h1>Posts</h1>
        <ul onChange={(e) => setPosts(e.target.value)}>
            {posts.map((post)=> {
                return (
                    <>
                        <li> 
                            Event:{post.event}
                            Reaction:{post.content}
                            User Comment:{post.User_Comment}
                        </li>
                        <div>
                            <button onClick={handleSubmitEdit}>Edit</button>
                            <button onClick={handleSubmitDelete}>Delete</button>
                        </div>
                    </>
                )
            })}
        </ul> 
        <h1>Communities</h1>
        <ul onChange={(e) => setCommunity(e.target.value)}>
            {community.map((community)=> {
                return (
                    <li> 
                        communityName:{community.communityName}
                    </li>
                )
            })}
        </ul> 

</div>
);  
        }
