import { useReducer } from "react";

export enum Status
{
    Idle,
    Fetching,
    Success,
    Fail
}
export enum Method
{
    Get = "GET",
    Post = "POST",
    Patch = "PATCH",
    Delete = "DELETE"
}

type State = 
{
    status: Status,
    err: Error | null,
    data: unknown
}

type Action = 
{
    type:'FETCH'
} 
|
{
    type:'SUCCESS',
    payload: {
        data: unknown
    }
}
|
{
    type:'FAIL',
    payload: {
        err: Error
    }
}
function reducer (state:State, action:Action)
{
    switch (action.type)
    {
        case "FETCH":
            return {...state, status: Status.Fetching, err:null}
        case "SUCCESS":
            return {...state, status: Status.Success, data: action.payload.data}
        case "FAIL":
            return {...state, status: Status.Fail, err: action.payload.err}
        default:
            return state;
    }
}

export default function ()
{
    const [state, dispatch] = useReducer (reducer, {
        status: Status.Idle,
        err: null,
        data: null
    })

    async function run (url:string, method:Method = Method.Get, body=null, contentType='application/json')
    {

        try
        {
            dispatch ({type:'FETCH'});

            const res = await fetch (url, {
                method,
                body,
                headers: method == Method.Get ? {} : {'Content-Type': contentType}
            });

            if (!res.ok)
                throw new Error ((await res.json ()).message || res.statusText);

            const data = await res.json ();

            dispatch ({type:"SUCCESS", payload: {data}});
        }
        catch (err)
        {
            dispatch ({type:"FAIL", payload:{err:err as Error}})
        }
    }


    return {run, state};
}