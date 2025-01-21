export default async function myEventHandler() {
    document.addEventListener('click', async () => {
      const result = await Promise.resolve('Hello'); 
      console.log(result); 
    });
  }