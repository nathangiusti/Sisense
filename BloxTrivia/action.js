 const user_answer = payload.data['selectVal']
 const correct_asnwer = payload.result.answer['text']
 if(user_answer == correct_asnwer) {
     alert("Correct!")
 }else{
     alert('Incorrect :(')
 }