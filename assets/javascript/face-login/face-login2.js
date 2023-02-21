    // for video
    
// for constant variables 
const assetsURL= window.location.origin+'/ci/assets'
const video = document.getElementById('videoInput')
const viewBtn = document.getElementById('submitBtn')
const viewBtn_label = document.getElementById('submitBtn-label')
const total_wanted = document.getElementById('total_wanted').value

viewBtn.style.display = 'none';
viewBtn_label.style.display = 'none';


// for other variables 
var available_users = 0
var failedChecking = 0;
var checkingover = 0;

let izina=''

// for all wanted ids array
const wantedids = [] 
let b =""           // helps in recording wantedids array one by one
for(let i=0; i<total_wanted; i++)
{
    b=i
    wantedids[i]= document.getElementById(b).value
}
console.log(wantedids)

// for loading models
Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri(assetsURL+'/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri(assetsURL+'/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri(assetsURL+'/models') 
]).then(start).catch(document.getElementById('message').innerHTML = "Wait" )


// for starting a camera
function start() 
{
    navigator.mediaDevices.getUserMedia({ audio: false, video: true }).then(function(stream) {
        if ("srcObject" in video) {
        video.srcObject = stream;
        } else {
        // Avoid using this in new browsers, as it is going away.
        video.src = window.URL.createObjectURL(stream);
        }
        video.onloadedmetadata = function(e) {
            video.play();
        };
    })
    .catch(function(err) {
        console.log(err.name + ": " + err.message);
    });

    document.getElementById('message').innerHTML = 'Loading...';
}



// for actual work
video.addEventListener('play', async () => {
    const displaySize = { width: video.width, height: video.height }
    setInterval(async () => 
    {
        if(checkingover==0)
        {
            const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors()
            var available_users = detections.length

            console.log('available users = '+available_users)
        
            if (available_users>0) 
            {
                // for notifying users about the processes
                console.log('identifying = '+failedChecking)

                if(failedChecking==0)
                {
                    document.getElementById('message').innerHTML = 'Collecting data'
                }
                else
                {
                    document.getElementById('message').innerHTML = 'identifying '+failedChecking
                }
                

                const resizedDetections = faceapi.resizeResults(detections, displaySize)
                const labeledDescriptors = await loadLabeledImages()
                const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.4)
                const result  = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
                let izina = result[0]['label']

                if (izina == 'unknown') 
                {
                    if (failedChecking<4) 
                    {
                        failedChecking += 1;
                        console.log('Unknown result')
                    }
                    else
                    {
                        document.getElementById('message').innerHTML = 'Try again: Face not recognized!';
                        console.log('try again face not recognized');
                        checkingover=1 // stop from here
                    }
                }
                else
                {
                    document.getElementById('detected').value=izina
                    document.getElementById('message').innerHTML = 'Criminal detected'
                    viewBtn_label.style.display = "block"
                    checkingover=1 // stop from here
                    console.log(izina)
                }
            }
            else
            {
                document.getElementById('message').innerHTML = 'No face detected'
            }
        }
        else{
            console.log('Check is over')
        }
    }, 1000)       
})


// for matching face descriptions
function loadLabeledImages() {
    const labels = wantedids
    return Promise.all(
        labels.map(async (label)=>{
            const descriptions = []
            for(let i=1; i<=4; i++) {
                    const img = await faceapi.fetchImage(assetsURL+`/images/users/${label}/${i}.jpg`).catch( ()=>{
                    document.getElementById('message').innerHTML = "No Image registered for this user"
                    // document.getElementById('message').style.visibility = 'hidden'
                })

                const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                descriptions.push(detections.descriptor)
            }
            return new faceapi.LabeledFaceDescriptors(label, descriptions)
        })
    )
}



