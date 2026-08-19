import { auth } from "@clerk/nextjs/server";

const TestPage = async () => {
    const {getToken} = await auth();
    const token = await getToken();
    
    const orderRes = await fetch("http://localhost:8001/test",{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const orderData = await orderRes.json();
    
    const paymentRes = await fetch("http://localhost:8002/test",{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    const paymentData = await paymentRes.json();


    const resProduct = await fetch("http://localhost:8000/test",{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const dataProduct =  await resProduct.json();

    
    // console.log(dataProduct);

  return (
    <div>
      <h1>Product Authentication status : {dataProduct.message}</h1>
      <h1>Payment Authentication status : {paymentData.message}</h1>
      <h1>Order Authentication status : {orderData.message}</h1>
      
    </div>

  )
}

export default TestPage