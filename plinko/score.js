const outputs=[];
const k =3;

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  // Ran every time a balls drops into a bucket
  outputs.push([dropPosition,bounciness,size,bucketLabel]);
}

function distance(pointA,pointB){
	return Math.abs(pointA - pointB)
}

function runAnalysis() {
    const [testSet,trainingSet]=splitDataset(outputs,10)

    console.log(trainingSet);

    for(let i=0;i<=testSet.length;i++){
      const bucket = knn(trainingSet,testSet[i][0])
    }

    console.log(bucket)

}

function knn(data,point){
 return _.chain(data)
    .map(row => [distance(row[0],point),row[3]])
    .sortBy(row=>row[0])
    .slice(0,k)
    .countBy(row=>row[1])
    .toPairs()
    .sortBy(row=>row[1])
    .last()
    .first()
    .parseInt()
    .value();
}


function splitDataset(data,testCount){
  const shuffeld=_.shuffle(data);
  const testSet=_.slice(shuffeld,0,testCount);
  const trainingSet=_.slice(shuffeld,testCount);
  return [testSet,trainingSet];
}