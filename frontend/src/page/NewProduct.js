import React, { useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { ImagetoBase64 } from "../utility/imagetoBase64";
import { toast } from "react-hot-toast";



const NewProduct = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
    password: "",
  });

  const handleonChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleonpassChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const uploadImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    // console.log(data)
    setData((preve) => {
      return {
        ...preve,
        image: data,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    const { name, image, category, price, password } = data;
    // console.log(process.env.REACT_NEW_PASS)
    const pw = password;
    const pw1 = process.env.REACT_APP_NEW_PASS;
    // console.log(pw)
    // console.log(pw1)
    if (pw === pw1) {
      if (name && image && category && price) {

          // console.log(data)
          // console.log(process.env.REACT_NEW_PASS)

        const fetchData = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}uploadProduct`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        const fetchRes = await fetchData.json();

        // console.log(fetchRes)
        toast(fetchRes.message);

        setData(() => {
          return {
            name: "",
            category: "",
            image: "",
            price: "",
            description: "",
          };
        });
      } else {
        toast("Enter Required Fields");
      }
    } else {
      toast("Incorrect Password");
    }
  };

  return (
    <div className="p-4">
      <form
        action=""
        className="m-auto w-full max-w-md shadow flex flex-col p-3 bg-white dark:bg-slate-800 rounded-lg"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type={"text"}
          name="name"
          className="bg-slate-200 dark:bg-slate-700 p-1 my-1"
          onChange={handleonChange}
          value={data.name}
        />
        <label htmlFor="category">Category</label>
        <select
          className="bg-slate-200 dark:bg-slate-700 p-1 my-1"
          id="category"
          name="category"
          onChange={handleonChange}
          value={data.category}
        >
          <option value={"other"}>Select Category</option>
          <option value={"laptop"}>Laptop</option>
          <option value={"mobile"}>Mobile</option>
          <option value={"computer"}>Computer</option>
          <option value={"headphone"}>Headphone</option>
          <option value={"earphone"}>Earphone</option>
        </select>

        {/* <input type={"text"} name='category' className='bg-slate-200 p-1 my-1' onChange={handleonChange}  /> */}

        <label htmlFor="image">
          Image
          <div className="h-40 w-full bg-slate-200 dark:bg-slate-700 rounded flex items-center justify-center cursor-pointer">
            {data.image ? (
              <img src={data.image} className="h-full " alt="" />
            ) : (
              <span className="text-5xl">
                <BsCloudUpload />
              </span>
            )}

            <input
              type={"file"}
              accept="image/*"
              onChange={uploadImage}
              className="hidden"
              id="image"
            />
          </div>
        </label>
        <label htmlFor="price">Price</label>
        <input
          type={"text"}
          name="price"
          className="bg-slate-200 p-1 my-1 dark:bg-slate-700"
          onChange={handleonChange}
          value={data.price}
        />

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id=""
          rows={2}
          className="bg-slate-200 p-1 my-1 resize-none dark:bg-slate-700"
          onChange={handleonChange}
          value={data.description}
        ></textarea>

        <label htmlFor="price">Password</label>
        <input
          type={"password"}
          name="password"
          className="bg-slate-200 p-1 my-1 dark:bg-slate-700"
          onChange={handleonpassChange}
          value={data.password}
        />
        <button className="bg-blue-400 hover:bg-blue-600 text-white text-lg font-medium drop-shadow my-2 rounded-lg">
          Save
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
