export function setMessageDetails(type, message, setMessage, setMessageData) {
    setMessage(true)
    if(type==='error'){
        setMessageData({type:type, message:message})
    }else if(type==='info'){
        setMessageData({type:type, message:message})
    }else {
        setMessageData({type:type, message:message})
    }
    setTimeout(() => setMessage(false), 5000)
}