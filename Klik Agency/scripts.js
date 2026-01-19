//Get the reference to the elements we need to change
const projectssection_element=document.querySelector("section#projects")
const project_elements=document.querySelectorAll("section#projects #projectgrid>div")
const fadetext_section=document.querySelector("section#fadetext")
const fadetext_text_element=document.querySelector("section#fadetext>p")

//Make all the words inside the fadetext paragraph seperate elements
const words_to_fade=fadetext_text_element.innerText.split(" ")
fadetext_text_element.innerHTML=""
words_to_fade.forEach((word)=>{
    fadetext_text_element.innerHTML+="<span>"+word+"</span> "
})

//Make the startlocation relative to the size of the window (works responsive)
project_elements.forEach((project_element,index)=>{
    let offset=75;
    if(index>1){ offset=375; }
    project_element.style.setProperty("--position-y",((window.innerHeight+offset)*-1)+"px")
})

//Function we found online to stop at 0% and 100% scroll outcome
const clampNumber=(num,a,b)=>Math.max(Math.min(num,Math.max(a,b)),Math.min(a,b));

//On every time the user scrolls we need to change the position, scale and rotation of the projectitems
window.addEventListener("scroll",()=>{
    const amount_of_pixels_for_fadetext=clampNumber((fadetext_section.getBoundingClientRect().top-(window.innerHeight*0.75))*-1,0,100000)
    const scrollstep=10
    const fadetext_words=document.querySelectorAll("section#fadetext>p>span")

    fadetext_words.forEach((word,index)=>{
        const amount_of_words_filled=Math.floor(amount_of_pixels_for_fadetext/scrollstep)
        if((index+1)<=amount_of_words_filled){
            word.style.opacity="1"
        } else {
            word.style.opacity="0.2"
        }
        if(index===amount_of_words_filled){
            const percentage_word=(amount_of_pixels_for_fadetext%scrollstep)/scrollstep
            word.style.opacity=0.2+(0.8*percentage_word)
        }
    })

    //Determine the percentage from 0% to 100% between the scroll state (clamped so it doesn't go over 100%), in decimal (between 0 and 1) 
    const percentage_scrolled=clampNumber(window.scrollY/window.innerHeight,0,1)
    //For each of the project divs that need to change
    project_elements.forEach((project_element)=>{
        //retrieve the base property values
        const base_rotation=parseInt(window.getComputedStyle(project_element, null).getPropertyValue("--rotation"))
        const base_scale=parseFloat(window.getComputedStyle(project_element, null).getPropertyValue("--scale"))
        const base_position_x=parseInt(window.getComputedStyle(project_element, null).getPropertyValue("--position-x"))
        const base_position_y=parseInt(window.getComputedStyle(project_element, null).getPropertyValue("--position-y"))
        //Determine the end values
        const final_position=0
        const final_rotation=0
        const final_scale=1

        //Apply the new position, scale and rotation based on the calculation
        // Start + full change * percentage of change (with unit it needs (px, deg or no unit))
        project_element.style.setProperty("transform","translate("+(base_position_x+((final_position-base_position_x)*percentage_scrolled))+"px,"+(base_position_y+((final_position-base_position_y)*percentage_scrolled))+"px) scale("+(base_scale+((final_scale-base_scale)*percentage_scrolled))+") rotate("+(base_rotation+((final_rotation-base_rotation)*percentage_scrolled))+"deg)")

    })
});
