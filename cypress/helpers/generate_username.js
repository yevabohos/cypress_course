export const functions = {

  generateUsername() {
    const names = [
      "hansolo77",
      "marymissday",
      "bloomingspring",
      "sarahsmith_jay",
      "testingstaff",
    ];
    
    const randomNum = Math.floor(Math.random() * 1000);
    const pickedNameIndex = Math.floor(Math.random() * names.length);
    return `${names[pickedNameIndex]}${randomNum}`;
}
  }
