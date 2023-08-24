import {useState, useEffect} from 'react';


export default function Login () {
    const [data, setData] = useState();
    
// // console.log(response.text()); // Log the entire response object
// return response.json();

    // fetch JSON data
    useEffect(() => {
        fetch('./EatVTSampleData/data/tuckerboxvermont/Tuckerbox.json')
        .then(response => response.json())
        .then((json) => {
            console.log(json.text())
            setData(json);
        })
        .catch(error => {
            console.error("Error fetching JSON because Wyatt is silly:", error);
        })
    }, [])

    // parse JSON data
    useEffect(() => {
        if (data) {
            try {
                const parsedData = JSON.parse(data);
                console.log(parsedData);
                // Now you can work with the parsedData object
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        }
    }, [data]);

    return (
        <div>
            <h1>This is a little peep into the business called tuckerbox</h1>
            {data ? (
                <div>
                    <p>{data.business}</p>
                </div>
            ) : ( 
            <div>
                <p>Loading...</p>
                <p>There might be an error fetching the json file for it</p>
            </div>)}
        </div>
    )
}