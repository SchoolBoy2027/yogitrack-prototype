


function User(action)
{{
        function Add() {
        return (
            <h2>I am a Add!</h2>
        );
        }

        function Modify() {
        return (
            <h2>I am Modify!</h2>
        );
        }

        function View() {
        return (
            <>
            <h1>I am View?</h1>
            </>
        );
        }



/*        createRoot(document.getElementById('root')).render(
        <User />
        );  
        */
}}

export default User(action);
/*
    const[searchParams, setSearchParams]=useSearchParams();
    let page=searchParams.get("action");

   const User = simulateSwitch(page) => {
        switch(param){
        case "add":
          
          break;
        case "edit":
          
          break;
        case "view":
          
          break;
      
        default:
          break;
        }
      };

      */