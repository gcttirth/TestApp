using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Newtonsoft.Json;
using UnityEngine.Networking;
using MiniJSON;
using System.Text;

public class APIManager : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        UserdataRequest obj = new UserdataRequest {
            username = "UnityUser",
            password = "UnityUser123"
        };
        StartCoroutine(PostRequest("http://localhost:3000/registration", obj));
    }

    IEnumerator PostRequest(string uri, UserdataRequest data)
    {
        var jsonString = JsonConvert.SerializeObject(data);
        Debug.Log("Json string = | " + jsonString);
        using(UnityWebRequest webRequest = UnityWebRequest.Put(uri, jsonString))
        {
            webRequest.method = "POST";
            webRequest.SetRequestHeader("Content-Type", "application/json");
            yield return webRequest.SendWebRequest();

            switch(webRequest.result)
            {
                case UnityWebRequest.Result.ConnectionError:
                case UnityWebRequest.Result.DataProcessingError:
                    Debug.LogError("API Something went wrong");
                    break;
                case UnityWebRequest.Result.Success:
                    Root root = JsonConvert.DeserializeObject<Root>(webRequest.downloadHandler.text);
                    Debug.Log("Result ack = " + root.user.acknowledged);
                    Debug.Log("Result msg = " + root.message);
                    break;
                default:
                    Debug.Log("Default" + webRequest.downloadHandler.text);
                    break;
            }
        }
    }
}


// Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);
    public class Root
    {
        public User user { get; set; }
        public string message { get; set; }
    }

    public class User
    {
        public bool acknowledged { get; set; }
        public string insertedId { get; set; }
    }

// Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);
    public class UserdataRequest
    {
        public string username { get; set; }
        public string password { get; set; }
    }

