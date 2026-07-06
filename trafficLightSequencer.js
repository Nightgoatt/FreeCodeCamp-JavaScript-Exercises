const config1 = {
  fault: false,
  phases: [
    { color: "green", duration: 5 },
    { color: "yellow", duration: 2 },
    { color: "red", duration: 4 }
  ]
};

const config2 = {
  fault: false,
  phases: [
    { color: "red", duration: 3 },
    { color: "yellow", duration: -2 },
    { color: "green", duration: 6 }
  ]
};

const config3 = {
  fault: true,
  phases: [
    { color: "green", duration: 5 },
    { color: "yellow", duration: 2 },
    { color: "red", duration: 6 }
  ]
};

const config4 = {
  fault: false,
  phases: []
};

function runSequence(config, cycles) {
  if(config.phases.length === 0){
        console.log('No phases found')
        return;
    }

  for(let cycle = 0; cycle < cycles; cycle++){
    for (const i of config.phases){
      if (config.fault === true){
        console.log('Faulted phase!')
        return;
      }else if(i.duration <= 0){
        console.log('Invalid phase detected');
      }else{
        console.log(`Switching to ${i.color} for ${i.duration} s`);
      }

    }
  }
    
};

function generateTimeline(config, cycles){
  let time = [];
  let total = 0;

  for(let cycle = 0; cycle < cycles; cycle++){
    for(const i of config.phases){
      time.push(total+=i.duration);

    }
  }
  return time;
};

//console.log(generateTimeline(config1, 2));

//runSequence(config1, 1)