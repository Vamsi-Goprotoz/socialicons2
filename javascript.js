document.addEventListener("DOMContentLoaded", function () {
    const defaultLocale = "en";
    const savedLocale = localStorage.getItem("selectedLocale") || defaultLocale;

    // Set initial dropdown values
    const localeDropdowns = document.querySelectorAll(".languageChange");
    localeDropdowns.forEach((localeDropdown) => {
        localeDropdown.value = savedLocale;
    });

    // Event listeners for language dropdowns
    localeDropdowns.forEach((localeDropdown) => {
        localeDropdown.addEventListener("change", function () {
            const currentLocale = localeDropdown.value;
            localStorage.setItem("selectedLocale", currentLocale);
            updateContent(currentLocale);
        });
    });

    // Initial content load
    updateContent(savedLocale);
});

function updateContent(locale) {
    const homepageApiUrl = `https://shark-app-ozmzy.ondigitalocean.app/api/homepage?locale=${locale}&populate=*`;
    const aboutUsApiUrl = `https://shark-app-ozmzy.ondigitalocean.app/api/about-us?locale=${locale}&populate=*`;

    // Update homepage content
    fetch(homepageApiUrl)
        .then(response => response.json())
        .then(updateHomepageContent)
        .catch(error => console.error("Error fetching homepage data:", error));

    // Update About Us content
    fetch(aboutUsApiUrl)
        .then(response => response.json())
        .then(updateAboutUsContent)
        .catch(error => console.error("Error fetching About Us data:", error));
}

function updateHomepageContent(data) {
    const homeData = data.data.attributes;
    // ... (rest of your existing code for updating homepage content) ...
}

function updateAboutUsContent(data) {
    const aboutUsData = data.data.attributes;
    document.getElementById("Overview_Heading").innerHTML = aboutUsData.Overview_Heading;
    document.getElementById("Overview_description").innerHTML = aboutUsData.Overview_description;
    document.getElementById("aboutUsHeading").innerHTML = aboutUsData.Section_infoHeading;
    document.getElementById("aboutUsDescription").innerHTML = aboutUsData.Section_infoDescription;
    document.getElementById("feature1Title").innerHTML = aboutUsData.feature1_title;
    document.getElementById("feature1Info").innerHTML = aboutUsData.feature1_info;
    document.getElementById("feature2Title").innerHTML = aboutUsData.feature2_title;
    document.getElementById("feature2Info").innerHTML = aboutUsData.feature2_info;
    document.getElementById("feature3Title").innerHTML = aboutUsData.feature3_title;
    document.getElementById("feature3Info").innerHTML = aboutUsData.feature3_info;
    document.getElementById("certificationHeading").innerHTML = aboutUsData.certification_heading;
    document.getElementById("certificationDescription").innerHTML = aboutUsData.certification_description;
    document.getElementById("ourEvolutionHeading").innerHTML = aboutUsData.Our_Evolution_heading;
    document.getElementById("ourEvolutionDescription").innerHTML = aboutUsData.Our_Evolution_description;
    document.getElementById("partnerTitle").innerHTML = aboutUsData.logoSection_title;
    document.getElementById("partnerDescription").innerHTML = aboutUsData.logoSection_description;
    document.getElementById("sigowillFactsheetHeading").innerHTML = aboutUsData.sigowillFactsheet_heading;
    document.getElementById("sigowillFactsheetDescription").innerHTML = aboutUsData.sigowillFactsheet_description;
    document.getElementById("feature1_img").src = `${aboutUsData.feature1_img.data.attributes.url}`;
    document.getElementById("feature2_img").src = `${aboutUsData.feature2_img.data.attributes.url}`;
    document.getElementById("feature3_img").src = `${aboutUsData.feature3_img.data.attributes.url}`;
    document.getElementById("downloadLink").setAttribute("href" , aboutUsData.pdf_file.data.attributes.url);
    // console.log(aboutUsData.PageCoverImg.data.attributes.url)

    //Setting Banner Image
    document.getElementById("pageCoverImg").style.backgroundImage = `url(${aboutUsData.PageCoverImg.data.attributes.url})`;
    // Access the array of partner logos using aboutUsData.partner_logos.data
    const partnerLogos = aboutUsData.partner_logos.data;
    const partnerLogosContainer = document.getElementById("partner_logos");
    partnerLogosContainer.innerHTML = '';
    partnerLogos.forEach(logo => {
        const logoAttributes = logo.attributes;
        const logoUrl = logoAttributes.url;
        const logoHTML = `
            <img src="${logoUrl}" alt="">
        `;
        partnerLogosContainer.innerHTML += logoHTML;
    });

    // Populate certificates
    const certificates = aboutUsData.certificates.data;
    const certificateContainer = document.getElementById("certificateContainer");
    certificateContainer.innerHTML = '';
    certificates.forEach(certificate => {
        const certificateAttributes = certificate.attributes;
        const imageUrl = certificateAttributes.url;
        const description = certificateAttributes.name;
        const descriptionWithoutExtension = description.replace(/\.\w+$/, '');
        const certificateHTML = `
            <div class="swiper-slide certificateImg">
                <div class="certificateImgContainer">
                    <img src="${imageUrl}" alt="">
                </div>
                <p class="certificateText">${descriptionWithoutExtension}</p>
            </div>
        `;
        certificateContainer.innerHTML += certificateHTML;
    });

    // Call setupSlideClickListeners after the content has been populated
    setupSlideClickListeners();
}

// Popup functionality
function openImagePopup(src) {
    let modal = document.getElementById('imagePopupModal');
    let modalImage = document.getElementById('imagePopupImage');
    modalImage.src = src;
    modal.style.display = "block";
}

function closeImagePopup() {
    let modal = document.getElementById('imagePopupModal');
    modal.style.display = "none";
}

function setupSlideClickListeners() {
    let slides = document.querySelectorAll('.swiper-slide');
    slides.forEach(slide => {
        slide.addEventListener('click', function () {
            let imgSrc = slide.querySelector('img').getAttribute('src');
            openImagePopup(imgSrc);
        });
    });
}

// Add an event listener to the download button
const downloadButton = document.getElementById("downloadAboutPDF");
downloadButton.addEventListener("click", () => {
    // Check if the PDF file URL is available in the aboutUsData object
    const pdfFileUrl = aboutUsData.pdf_file; // Replace with the actual key for the PDF file URL
    // Check if the URL is not empty or null
    if (pdfFileUrl) {
        // Create a hidden anchor element to trigger the download
        const downloadLink = document.createElement("a");
        downloadLink.href = pdfFileUrl;

        // Set the download attribute to suggest a filename for the downloaded file
        downloadLink.download = "about_us.pdf"; // You can customize the filename here

        // Trigger a click event on the anchor element to start the download
        downloadLink.click();

        // Clean up the anchor element
        downloadLink.remove();
    } else {
        // Handle the case where the PDF file URL is missing or empty
        console.error("PDF file URL is missing.");
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const defaultLocale = "en";
    const savedLocale = localStorage.getItem("selectedLocale") || defaultLocale;

    // Set initial dropdown values
    const localeDropdowns = document.querySelectorAll(".languageChange");
    localeDropdowns.forEach((localeDropdown) => {
        localeDropdown.value = savedLocale;
    });

    // Event listeners for language dropdowns
    localeDropdowns.forEach((localeDropdown) => {
        localeDropdown.addEventListener("change", function () {
            const currentLocale = localeDropdown.value;
            localStorage.setItem("selectedLocale", currentLocale);
            updateContent(currentLocale);
        });
    });

    // Initial content load
    updateContent(savedLocale);
});

function updateContent(locale) {
    const approachApiUrl = `https://shark-app-ozmzy.ondigitalocean.app/api/Approach?locale=${locale}&populate=*`;


    // Update About Us content
    fetch(approachApiUrl)
        .then(response => response.json())
        .then(updateApproachContent)
        .catch(error => console.error("Error fetching About Us data:", error));
}

function updateApproachContent(data) {
    const approachData = data.data.attributes;
    document.getElementById("ourApproachOverView").innerHTML = approachData.SubTitle;
    document.getElementById("Approach_Overview_description").innerHTML = approachData.Overview_description;
    document.getElementById("Approach_Section_Heading").innerHTML = approachData.SectionHeading;
    document.getElementById("Approach_Section_Description").innerHTML = approachData.SectionDescription;
    document.getElementById("Approach_PhaseAndGateHeading").innerHTML = approachData.PhaseAndGateHeading;
    document.getElementById("Approach_PhaseAndGateDescription").innerHTML = approachData.PhaseAndGateDescription;
    document.getElementById("Approach_phasesHeading").innerHTML = approachData.Approach_phasesHeading;
    document.getElementById("Approach_phasesDescription").innerHTML = approachData.Approach_phasesDescription;
    document.getElementById("pageCoverImg").style.backgroundImage = `url(${approachData.bannerImg.data.attributes.url})`;
}


document.addEventListener("DOMContentLoaded", function () {
    const defaultLocale = "en";
    const savedLocale = localStorage.getItem("selectedLocale") || defaultLocale;

    // Set initial dropdown values
    const localeDropdowns = document.querySelectorAll(".languageChange");
    localeDropdowns.forEach((localeDropdown) => {
        localeDropdown.value = savedLocale;
    });

    // Event listeners for language dropdowns
    localeDropdowns.forEach((localeDropdown) => {
        localeDropdown.addEventListener("change", function () {
            const currentLocale = localeDropdown.value;
            localStorage.setItem("selectedLocale", currentLocale);
            updateContent(currentLocale);
        });
    });

    // Initial content load
    updateContent(savedLocale);
});

function updateContent(locale) {
    const capabilityApiUrl = `https://shark-app-ozmzy.ondigitalocean.app/api/blogs?locale=${locale}&populate=*`;

    // Update About Us content
    fetch(capabilityApiUrl)
        .then(response => response.json())
        .then(updateCapabilityContent)
        .catch(error => console.error("Error fetching About Us data:", error));
}

function updateCapabilityContent(data) {
    const blogData = data.data[0].attributes;
    console.log(blogData);
    let imgElement = document.getElementById("blogcoverImg")
    document.getElementById("BlogDescription").innerHTML = blogData.Blog_info;
    document.getElementById("Blog_readtime").innerHTML = blogData.Blog_readtime;
    document.getElementById("Blog_Title").innerHTML = blogData.Blog_Title;
    document.getElementById("Blog_Sub").innerHTML = blogData.Blog_Sub;
    document.getElementById("Blog_Second_Heading").innerHTML = blogData.Blog_Heading;
    imgElement.setAttribute("src", `https://shark-app-ozmzy.ondigitalocean.app${blogData.BlogCoverImg.data.attributes.url}`)
}


document.addEventListener("DOMContentLoaded", function () {
    const defaultLocale = "en";
    const savedLocale = localStorage.getItem("selectedLocale") || defaultLocale;

    const localeDropdowns = document.querySelectorAll(".languageChange");
    localeDropdowns.forEach((localeDropdown) => {
        localeDropdown.value = savedLocale;
    });

    localeDropdowns.forEach((localeDropdown) => {
        localeDropdown.addEventListener("change", function () {
            const currentLocale = localeDropdown.value;
            localStorage.setItem("selectedLocale", currentLocale);
            updateContent(currentLocale);
        });
    });

    updateContent(savedLocale);
});

function updateContent(locale) {
    const careerApiUrl = `https://shark-app-ozmzy.ondigitalocean.app/api/career-overview?populate=*&locale=${locale}`;

    fetch(careerApiUrl)
        .then(response => response.json())
        .then(updateCareerContent)
        .catch(error => console.error("Error fetching Career data:", error));
}

function updateCareerContent(data) {
    const careerData = data.data.attributes;

    document.getElementById("subTitle").innerHTML = careerData?.subTitle;
    document.getElementById("Title").innerHTML = careerData?.Title;
    document.getElementById("SectionHeading").innerHTML = careerData?.SectionHeading;
    document.getElementById("SectionDescription").innerHTML = careerData?.SectionDescription;
    document.getElementById("InfoHeading1").innerHTML = careerData?.InfoHeading1;
    document.getElementById("InfoDescription1").innerHTML = careerData?.InfoDescription1;
    document.getElementById("InfoHeading2").innerHTML = careerData?.InfoHeading2;
    document.getElementById("InfoDescription2").innerHTML = careerData?.InfoDescription2;
    document.getElementById("InfoHeading3").innerHTML = careerData?.InfoHeading3;
    document.getElementById("InfoDescription3").innerHTML = careerData?.InfoDescription3;
    document.getElementById("ClientTestimonialHeading").innerHTML = careerData?.ClientTestimonialHeading;
    document.getElementById("EmployeeTestimonialHeading").innerHTML = careerData?.EmployeeTestimonialHeading;
    document.getElementById("OpeningSectionSubHeading").innerHTML = careerData?.OpeningSectionSubHeading;
    document.getElementById("OpeningSectionHeading").innerHTML = careerData?.OpeningSectionHeading;

    // Updating image elements:
    document.getElementById("InfoImage1").src = careerData?.InfoImage1?.data?.attributes?.url;
    document.getElementById("InfoImage2").src = careerData?.InfoImage2?.data?.attributes?.url;
    document.getElementById("InfoImage3").src = careerData?.InfoImage3?.data?.attributes?.url;
}


let careerData;
function openSideBar(ind) {
    fetch("https://shark-app-ozmzy.ondigitalocean.app/api/jobs?populate=*").then(res => res.json()).then(data => {
        careerData = data.data;
        console.log(careerData);
        document.getElementById("JobDetailsTopic").innerHTML = careerData[ind].attributes.Job_Role;
        document.getElementById("jobDetailsDescription").innerHTML = careerData[ind].attributes.Job_description;
        document.getElementById("Job_Id_Number").innerHTML = careerData[ind].attributes.Job_Id_Number;
        document.getElementById("Job_Location").innerHTML = careerData[ind].attributes.Job_Location;
        document.getElementById("Job_Title").innerHTML = careerData[ind].attributes.Job_Title;
    })
    var sidebar = document.querySelector('.career-sidebar');
    sidebar.style.right = '0';
}

document.addEventListener("DOMContentLoaded", function () {
    const defaultLocale = "en";
    const savedLocale = localStorage.getItem("selectedLocale") || defaultLocale;

    // Set initial dropdown values
    const localeDropdowns = document.querySelectorAll(".languageChange");
    localeDropdowns.forEach((localeDropdown) => {
        localeDropdown.value = savedLocale;
    });

    // Event listeners for language dropdowns
    localeDropdowns.forEach((localeDropdown) => {
        localeDropdown.addEventListener("change", function () {
            const currentLocale = localeDropdown.value;
            localStorage.setItem("selectedLocale", currentLocale);
            updateContent(currentLocale);
        });
    });

    // Initial content load
    updateContent(savedLocale);
});

function updateContent(locale) {
    const homepageApiUrl = `https://shark-app-ozmzy.ondigitalocean.app/api/jobs?locale=${locale}&populate=*`;

    // Update homepage content
    fetch(homepageApiUrl)
        .then(response => response.json())
        .then(updateHomepageContent)
        .catch(error => console.error("Error fetching homepage data:", error));

}

function updateHomepageContent(data) {
    careerData = data.data;
    let careerApplySec = careerData.map((data, ind) => (
        `<div class="JobCard d-flex justify-content-between">
            <div class="jobInfo">
                <h2>${data.attributes.Job_Title}</h2>
                <h3>${data.attributes.Job_Location}</h3>
                <p>${data.attributes.Job_Id_Number}</p>
            </div>
            <div>
                <a class="applyBtn" href="#" onclick="openSideBar(${ind})">Apply</a>
            </div>
        </div>`
    ))
    careerApplySec = careerApplySec.join("")
    document.getElementById("jobApplySection").innerHTML = careerApplySec;
}

document.addEventListener("DOMContentLoaded", function () {
    const defaultLocale = "en";
    const savedLocale = localStorage.getItem("selectedLocale") || defaultLocale;

    // Set initial dropdown values
    const localeDropdowns = document.querySelectorAll(".languageChange");
    localeDropdowns.forEach((localeDropdown) => {
        localeDropdown.value = savedLocale;
    });

    // Event listeners for language dropdowns
    localeDropdowns.forEach((localeDropdown) => {
        localeDropdown.addEventListener("change", function () {
            const currentLocale = localeDropdown.value;
            localStorage.setItem("selectedLocale", currentLocale);
            updateContent(currentLocale);
        });
    });

    // Initial content load
    updateContent(savedLocale);
});

function updateContent(locale) {
    const clientTestApiUrl = `https://shark-app-ozmzy.ondigitalocean.app/api/client-testimonials?locale=${locale}&populate=*`;

    // Update homepage content
    fetch(clientTestApiUrl)
        .then(response => response.json())
        .then(updateTestContent)
        .catch(error => console.error("Error fetching homepage data:", error));

}


function updateTestContent(data) {
    // const aboutUsData = data.data.attributes;
    let testimonialSlideData =  data.data.map((data, ind) => (
        `<div class="testimonial-slide">
    <div class="testimonial">
        <div class="testimonialContent">
            <p class="testimonialContentFull" id="testimonialDesc">${data.attributes.testimonial}</p>
            <h3 id="testimonialName">${data.attributes.Name}</h3>
            <h5 id="testimonialPos">${data.attributes.designation}</h5>
        </div>
    </div>
</div>`
    ))
    testimonialSlideData = testimonialSlideData.join("");
    document.getElementById("ClientTestimonialSlides").innerHTML = testimonialSlideData;
}

document.addEventListener("DOMContentLoaded", function () {
    const defaultLocale = "en";
    const savedLocale = localStorage.getItem("selectedLocale") || defaultLocale;

    const localeDropdowns = document.querySelectorAll(".languageChange");
    localeDropdowns.forEach((localeDropdown) => {
        localeDropdown.value = savedLocale;
    });

    localeDropdowns.forEach((localeDropdown) => {
        localeDropdown.addEventListener("change", function () {
            const currentLocale = localeDropdown.value;
            localStorage.setItem("selectedLocale", currentLocale);
            updateContactUsContent(currentLocale);
        });
    });

    updateContactUsContent(savedLocale);
});

function updateContactUsContent(locale) {
    const contactUsApiUrl = `https://shark-app-ozmzy.ondigitalocean.app/api/contact-us?locale=${locale}&populate=*`;

    fetch(contactUsApiUrl)
        .then(response => response.json())
        .then(data => {
            const contactData = data.data.attributes;

            const prepareText = (text) => (text || "").replace(/\n/g, '<br>');

            // General Enquiries
            document.getElementById("enquiry1_heading").innerHTML = prepareText(contactData.enquiry1_heading);
            document.getElementById("enquiry1_name").innerHTML = prepareText(contactData.enquiry1_name);
            document.getElementById("enquiry1_address").innerHTML = prepareText(contactData.enquiry1_address);

            document.getElementById("enquiry2_heading").innerHTML = prepareText(contactData.enquiry2_heading);
            document.getElementById("enquiry2_name").innerHTML = prepareText(contactData.enquiry2_name);
            document.getElementById("enquiry2_address").innerHTML = prepareText(contactData.enquiry2_address);

            document.getElementById("Main_Add_Address").innerHTML = prepareText(contactData.Main_Add_Address);
            document.getElementById("Main_Add_Name").innerHTML = prepareText(contactData.Main_Add_Name);

            // Manufacturing Enquiries
            document.getElementById("Manufacturing_enquiry1_heading").innerHTML = prepareText(contactData.Manufacturing_enquiry1_heading);
            document.getElementById("Manufacturing_enquiry1_name").innerHTML = prepareText(contactData.Manufacturing_enquiry1_name);
            document.getElementById("Manufacturing_enquiry1_address").innerHTML = prepareText(contactData.Manufacturing_enquiry1_address);

            document.getElementById("Manufacturing_enquiry2_heading").innerHTML = prepareText(contactData.Manufacturing_enquiry2_heading);
            document.getElementById("Manufacturing_enquiry2_name").innerHTML = prepareText(contactData.Manufacturing_enquiry2_name);
            document.getElementById("Manufacturing_enquiry2_address").innerHTML = prepareText(contactData.Manufacturing_enquiry2_address);

            // General Info
            document.getElementById("generalInfo_heading").innerHTML = prepareText(contactData.generalInfo_heading);
            document.getElementById("generalInfo_email").innerHTML = prepareText(contactData.generalInfo_email);
            document.getElementById("generalInfo_phNo").innerHTML = prepareText(contactData.generalInfo_phNo);

            // Chinese Main Address
            document.getElementById("Chinese_Main_Add_Name").innerHTML = prepareText(contactData.Chinese_Main_Add_Name);
            document.getElementById("chinese_Main_Add_Address").innerHTML = prepareText(contactData.chinese_Main_Add_Address);

            // Additional Manufacturing Enquiries
            document.getElementById("Manufacturing_enquiry3_heading").innerHTML = prepareText(contactData.Manufacturing_enquiry3_heading);
            document.getElementById("Manufacturing_enquiry3_name").innerHTML = prepareText(contactData.Manufacturing_enquiry3_name);
            document.getElementById("Manufacturing_enquiry3_address").innerHTML = prepareText(contactData.Manufacturing_enquiry3_address);

            document.getElementById("Chinese_Manufacturing_Main_Add").innerHTML = prepareText(contactData.Chinese_Manufacturing_Main_Add);
            document.getElementById("Chinese_Manufacturing_Main_Add_Address").innerHTML = prepareText(contactData?.Chinese_Manufacturing_Main_Add_Address);

            // Manufacturing Main Address
            document.getElementById("Manufacturing_Main_Add_Name").innerHTML = prepareText(contactData.Manufacturing_Main_Add_Name);
            document.getElementById("Manufacturing_Main_Add_address").innerHTML = prepareText(contactData?.Manufacturing_Main_Add_address);

            
            // Main Address
           
           




            // Customer Support
            document.getElementById("customerSupportHeading").innerHTML = prepareText(contactData.customerSupportHeading);
            document.getElementById("customerSupportPara").innerHTML = prepareText(contactData.customerSupportPara);
            document.getElementById("customerSupportSubPara").innerHTML = prepareText(contactData.customerSupportSubPara);

            // Careers
            document.getElementById("Careerheading").innerHTML = prepareText(contactData.Careerheading);
            document.getElementById("CareerInformation").innerHTML = prepareText(contactData.CareerInformation);

            // Images
            if (contactData.CustomerSupportImg && contactData.CustomerSupportImg.data) {
                document.getElementById("customerSupportImage").src = contactData.CustomerSupportImg.data.attributes.url;
            } else {
                document.getElementById("customerSupportImage").src = "";
            }

            if (contactData.CareersInfoImg && contactData.CareersInfoImg.data) {
                document.getElementById("careersImage").src = contactData.CareersInfoImg.data.attributes.url;
            } else {
                document.getElementById("careersImage").src = "";
            }
        })
        .catch(error => console.error("Error fetching contact us data:", error));
}


document.addEventListener("DOMContentLoaded", function () {
    const contactApiUrl = "https://shark-app-ozmzy.ondigitalocean.app/api/contact-us?populate=*";
    function updateContactContent(apiUrl){
        fetch(apiUrl).then(res => res.json()).then(data => {
            const contactData = data.data.attributes;
        }).catch(error => {
            console.error("Error fetching about us data:", error);
        });
    }

    updateContactContent(contactApiUrl);
})

document.addEventListener("DOMContentLoaded", function () {
    // Locale-related code
    const defaultLocale = "en";
    const savedLocale = localStorage.getItem("selectedLocale") || defaultLocale;
    const localeDropdowns = document.querySelectorAll(".languageChange");

    localeDropdowns.forEach((localeDropdown) => {
        localeDropdown.value = savedLocale;
    });

    localeDropdowns.forEach((localeDropdown) => {
        localeDropdown.addEventListener("change", function () {
            const currentLocale = localeDropdown.value;
            localStorage.setItem("selectedLocale", currentLocale);
            updateContent(currentLocale);
        });
    });

    updateContent(savedLocale);

    // Employee Testimonial code
    const empTestApiUrl = "https://shark-app-ozmzy.ondigitalocean.app/api/employee-testimonials?populate=*";
    const clientTestApiUrl = "https://shark-app-ozmzy.ondigitalocean.app/api/client-testimonials?populate=*";

    function updateEmpTest(apiUrl) {
        fetch(apiUrl)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                const EmpTestData = data.data;
                console.log("Employee Testimonial Data:", EmpTestData); // Debug

                let employeeTestimonial =  EmpTestData.map((data, index) => (
                    `<div class="swiper-slide">
                    <div class="customerSayCard">
                               <p id="EmpTestDesc0">${data.attributes.testimonial}</p>
                               <h2 id="EmpTestName0">${data.attributes.Name}</h2>
                               <h3 id="EmpTestPos0">${data.attributes.designation}</h3>
                           </div>
                       </div>`
                ));
                employeeTestimonial = employeeTestimonial.join("");
                document.getElementById("Career_emp_testimonials").innerHTML = employeeTestimonial
            })
            .catch(error => {
                console.error("Error fetching employee testimonials:", error);
            });
    }
    function updateClientTest(apiUrl){
        fetch(apiUrl)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                let clientTestmonial = data.data.map((data, ind) => (
                    `<div class="swiper-slide">
                    <div class="testimonialDarkCard">
                        <p id="testimonialDesc0">${data.attributes.testimonial}</p>
                        <h2 id="testimonialName0">${data.attributes.Name}</h2>
                        <h3 id="testimonialPos0">${data.attributes.designation}</h3>
                    </div>
                </div>`
                ))
                clientTestmonial = clientTestmonial.join("");
                document.getElementById("Career_client_testimonials").innerHTML = clientTestmonial;
            })
            .catch(error => {
                console.error("Error fetching employee testimonials:", error);
            });
    }
    updateEmpTest(empTestApiUrl);
    updateClientTest(clientTestApiUrl);
});


document.addEventListener("DOMContentLoaded", function () {
    const defaultLocale = "en";
    const savedLocale = localStorage.getItem("selectedLocale") || defaultLocale;

    // Set initial dropdown values
    const localeDropdowns = document.querySelectorAll(".languageChange");
    localeDropdowns.forEach((localeDropdown) => {
        localeDropdown.value = savedLocale;
    });

    // Event listeners for language dropdowns
    localeDropdowns.forEach((localeDropdown) => {
        localeDropdown.addEventListener("change", function () {
            const currentLocale = localeDropdown.value;
            localStorage.setItem("selectedLocale", currentLocale);
            updateContent(currentLocale);
        });
    });

    // Initial content load
    updateContent(savedLocale);
});

function updateContent(locale) {
    const capabilityApiUrl = `https://shark-app-ozmzy.ondigitalocean.app/api/expertise-page-product-design?locale=${locale}&populate=*`;
    
    // Update About Us content
    fetch(capabilityApiUrl)
        .then(response => response.json())
        .then(updateCapabilityContent)
        .catch(error => console.error("Error fetching About Us data:", error));
}

function updateCapabilityContent(data) {
    const capabilityData = data.data.attributes;
    console.log(capabilityData);
    document.getElementById("pageCoverImg").style.backgroundImage = `url(${capabilityData.bannerImage.data.attributes.url})`;
    document.getElementById("SubHeading").innerHTML = capabilityData?.SubHeading;
    document.getElementById("MainHeading").innerHTML = capabilityData?.MainHeading;
    document.getElementById("SectionTitle").innerHTML = capabilityData?.SectionTitle;
    document.getElementById("OverviewDescription").innerHTML = capabilityData?.OverviewDescription;
    document.getElementById("SectionDescription").innerHTML = capabilityData?.SectionDescription;
    document.getElementById("OurExpertise_heading").innerHTML = capabilityData?.OurExpertise_heading;
    document.getElementById("OurExpertise_description").innerHTML = capabilityData?.OurExpertise_description;
    document.getElementById("CarouselHeading").innerHTML = capabilityData?.CarouselHeading;
    document.getElementById("CarouselDescription").innerHTML = capabilityData.CarouselDescription;
}


document.addEventListener("DOMContentLoaded", function () {
    const defaultLocale = "en";
    const savedLocale = localStorage.getItem("selectedLocale") || defaultLocale;

    const localeDropdowns = document.querySelectorAll(".languageChange");
    localeDropdowns.forEach((localeDropdown) => {
        localeDropdown.value = savedLocale;
    });

    localeDropdowns.forEach((localeDropdown) => {
        localeDropdown.addEventListener("change", function () {
            const currentLocale = localeDropdown.value;
            localStorage.setItem("selectedLocale", currentLocale);
            updateContent(currentLocale);
        });
    });

    updateContent(savedLocale);
});

function updateContent(locale) {
    const aboutUsApiUrl = `https://shark-app-ozmzy.ondigitalocean.app/api/expertise-overview?populate=*&locale=${locale}`;

    fetch(aboutUsApiUrl)
        .then(response => response.json())
        .then(updateAboutUsContent)
        .catch(error => console.error("Error fetching About Us data:", error));
}

function updateAboutUsContent(data) {
    const aboutUsData = data.data.attributes;

    document.getElementById("BannerSubHeading").innerHTML = aboutUsData?.BannerSubHeading;
    document.getElementById("BannerHeading").innerHTML = aboutUsData?.BannerHeading;
    document.getElementById("overviewDescription").innerHTML = aboutUsData?.overviewDescription;
    document.getElementById("SectionHeading").innerHTML = aboutUsData?.SectionHeading;
    document.getElementById("SectionDescription").innerHTML = aboutUsData?.SectionDescription;
    document.getElementById("ExpertiseTitle1").innerHTML = aboutUsData?.ExpertiseTitle1;
    document.getElementById("ExpertiseDescription1").innerHTML = aboutUsData?.ExpertiseDescription1;
    document.getElementById("ExpertiseTitle2").innerHTML = aboutUsData?.ExpertiseTitle2;
    document.getElementById("ExpertiseDescription2").innerHTML = aboutUsData?.ExpertiseDescription2;
    document.getElementById("ExpertiseTitle3").innerHTML = aboutUsData?.ExpertiseTitle3;
    document.getElementById("ExpertiseDescription3").innerHTML = aboutUsData?.ExpertiseDescription3;
    document.getElementById("carouselHeading").innerHTML = aboutUsData?.carouselHeading;
    document.getElementById("carouselDescription").innerHTML = aboutUsData?.carouselDescription;
    document.getElementById("carouselHeading2").innerHTML = aboutUsData?.carouselHeading;
    document.getElementById("carouselDescription2").innerHTML = aboutUsData?.carouselDescription;
    document.getElementById("stripSubheading").innerHTML = aboutUsData?.stripSubheading;
    document.getElementById("stripHeading").innerHTML = aboutUsData?.stripHeading;
    document.getElementById("stripDescription").innerHTML = aboutUsData?.stripDescription;

    // If you need to update the image elements:
    document.getElementById("ExpertiseImage1").src = aboutUsData?.ExpertiseImage1?.data?.attributes?.url;
    document.getElementById("ExpertiseImage2").src = aboutUsData?.ExpertiseImage2?.data?.attributes?.url;
    document.getElementById("ExpertiseImage3").src = aboutUsData?.ExpertiseImage3?.data?.attributes?.url;
}



document.addEventListener("DOMContentLoaded", function () {
    const defaultLocale = "en";
    const savedLocale = localStorage.getItem("selectedLocale") || defaultLocale;

    // Set initial dropdown values
    const localeDropdowns = document.querySelectorAll(".languageChange");
    localeDropdowns.forEach((localeDropdown) => {
        localeDropdown.value = savedLocale;
    });

    // Event listeners for language dropdowns
    localeDropdowns.forEach((localeDropdown) => {
        localeDropdown.addEventListener("change", function () {
            const currentLocale = localeDropdown.value;
            localStorage.setItem("selectedLocale", currentLocale);
            updateContent(currentLocale);
        });
    });

    // Initial content load
    updateContent(savedLocale);
});

function updateContent(locale) {
    const capabilityApiUrl = `https://shark-app-ozmzy.ondigitalocean.app/api/expertise-page-manufacturing?locale=${locale}&populate=*`;
    
    // Update About Us content
    fetch(capabilityApiUrl)
        .then(response => response.json())
        .then(updateCapabilityContent)
        .catch(error => console.error("Error fetching About Us data:", error));
}

function updateCapabilityContent(data) {
    const capabilityData = data.data.attributes;
    document.getElementById("pageCoverImg").style.backgroundImage = `url(${capabilityData.bannerImage.data.attributes.url})`;
    document.getElementById("SubHeading").innerHTML = capabilityData?.SubHeading;
    document.getElementById("MainHeading").innerHTML = capabilityData?.MainHeading;
    document.getElementById("SectionTitle").innerHTML = capabilityData?.SectionTitle;
    document.getElementById("OverviewDescription").innerHTML = capabilityData?.OverviewDescription;
    document.getElementById("SectionDescription").innerHTML = capabilityData?.SectionDescription;
    // document.getElementById("OurExpertise_heading").innerHTML = capabilityData?.OurExpertise_heading;
    // document.getElementById("OurExpertise_description").innerHTML = capabilityData?.OurExpertise_description;
    // document.getElementById("CarouselHeading").innerHTML = capabilityData?.CarouselHeading;
    // document.getElementById("CarouselDescription").innerHTML = capabilityData.CarouselDescription;
}


document.addEventListener("DOMContentLoaded", function () {
    const defaultLocale = "en";
    const savedLocale = localStorage.getItem("selectedLocale") || defaultLocale;

    // Set initial dropdown values
    const localeDropdowns = document.querySelectorAll(".languageChange");
    localeDropdowns.forEach((localeDropdown) => {
        localeDropdown.value = savedLocale;
    });

    // Event listeners for language dropdowns
    localeDropdowns.forEach((localeDropdown) => {
        localeDropdown.addEventListener("change", function () {
            const currentLocale = localeDropdown.value;
            localStorage.setItem("selectedLocale", currentLocale);
            updateContent(currentLocale);
        });
    });

    // Initial content load
    updateContent(savedLocale);
});

function updateContent(locale) {
    const capabilityApiUrl = `https://shark-app-ozmzy.ondigitalocean.app/api/expertise-page-capabilitie?locale=${locale}&populate=*`;
    
    // Update About Us content
    fetch(capabilityApiUrl)
        .then(response => response.json())
        .then(updateCapabilityContent)
        .catch(error => console.error("Error fetching About Us data:", error));
}

function updateCapabilityContent(data) {
    const capabilityData = data.data.attributes;
    document.getElementById("pageCoverImg").style.backgroundImage = `url(${capabilityData.bannerImage.data.attributes.url})`;
    document.getElementById("SubHeading").innerHTML = capabilityData?.SubHeading;
    document.getElementById("MainHeading").innerHTML = capabilityData?.MainHeading;
    document.getElementById("SectionTitle").innerHTML = capabilityData?.SectionTitle;
    document.getElementById("OverviewDescription").innerHTML = capabilityData?.OverviewDescription;
    document.getElementById("SectionDescription").innerHTML = capabilityData?.SectionDescription;
    document.getElementById("OurExpertise_heading").innerHTML = capabilityData?.OurExpertise_heading;
    document.getElementById("OurExpertise_description").innerHTML = capabilityData?.OurExpertise_description;
    document.getElementById("CarouselHeading").innerHTML = capabilityData?.CarouselHeading;
    document.getElementById("CarouselDescription").innerHTML = capabilityData.CarouselDescription;
}



    async function fetchTestimonialData(locale) {
            try {
                const response = await fetch(`https://shark-app-ozmzy.ondigitalocean.app/api/client-testimonials?locale=${locale}`);
    const data = await response.json();
    return data.data;
            } catch (error) {
        console.error("Error fetching testimonial data:", error);
            }
        }

    // Function to update the DOM with the testimonial data
    function updateTestimonialContent(testimonialData) {
            const testimonialContainer = document.getElementById('testimonialContainer');
    testimonialContainer.innerHTML = '';
            testimonialData.forEach(testimonial => {
                const {attributes: {Name, designation, testimonial: testimonialText } } = testimonial;
    const testimonialHTML = `
    <div class="testimonial-slide" style="display: none;">
        <div class="testimonial">
            <div class="testimonialContent">
                <p class="testimonialContentFull">${testimonialText}</p>
                <h3>${Name}</h3>
                <h5>${designation}</h5>
            </div>
        </div>
    </div>`;
    testimonialContainer.insertAdjacentHTML('beforeend', testimonialHTML);
            });
    initCarousel();  // re-initialize the carousel after updating the content
        }

    // Function to handle language change
async function handleTestimonialLanguageChange(locale) {
    const testimonialData = await fetchTestimonialData(locale);
    updateTestimonialContent(testimonialData);
}

// DOM content loaded event listener
document.addEventListener("DOMContentLoaded", async function () {
    const savedLang = localStorage.getItem("selectedLocale") || "en";
    document.querySelectorAll('.languageChange').forEach(dropdown => {
        dropdown.addEventListener('change', function () {
            const selectedLang = this.value;
            localStorage.setItem("selectedLocale", selectedLang);
            handleTestimonialLanguageChange(selectedLang);  // Updated to call the renamed function
        });
        dropdown.value = savedLang;
    });
    handleTestimonialLanguageChange(savedLang);  // Updated to call the renamed function
});

    // Function to initialize the testimonial carousel
    function initCarousel() {
            const slides = document.querySelectorAll(".testimonial-slide");
    let currentSlide = 0;
    const totalSlides = slides.length;
    const currentSlideIndicator = document.getElementById("currentSlide");
    const totalSlideIndicator = document.getElementById("totalSlides");

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? "block" : "none";
        });
            }

    if (document.getElementById("prev")) {
        document.getElementById("prev").addEventListener("click", () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
            updateIndicator();
        });
            }

    if (document.getElementById("next")) {
        document.getElementById("next").addEventListener("click", () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
            updateIndicator();
        });
            }

    function updateIndicator() {
                if (currentSlideIndicator) currentSlideIndicator.textContent = currentSlide + 1;
    if (totalSlideIndicator) totalSlideIndicator.textContent = totalSlides;
            }

    showSlide(currentSlide);
    updateIndicator();
        }


// Define a function to update the innerHTML of an element
function updateInnerHTML(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.innerHTML = value;
    } else {
        console.warn(`Element with id ${id} not found.`);
    }
}

// Function to fetch localized data based on the selected locale
async function fetchLocalizedData(locale) {
    try {
        const response = await fetch(`https://shark-app-ozmzy.ondigitalocean.app/api/homepage?locale=${locale}&populate=*`);
        const data = await response.json();
        return data.data.attributes;
    } catch (error) {
        console.error("Error fetching localized data:", error);
    }
}

// Function to update the DOM with the localized data
function updateHomepageContent(localizedData) {
    const homeData = localizedData;
    updateInnerHTML("feature1", homeData?.feature1);
    updateInnerHTML("feature2", homeData?.feature2);
    updateInnerHTML("feature3", homeData?.feature3);
    updateInnerHTML("feature4", homeData?.feature4);
    updateInnerHTML("BigHelloText", homeData?.BigHelloText);
    updateInnerHTML("HelloTitle", homeData?.HelloTitle);
    updateInnerHTML("HelloDescription", homeData?.HelloDescription);
    updateInnerHTML("HomeBanner1SubTitle", homeData?.HomeBanner1SubTitle);
    updateInnerHTML("HomeBanner1Title", homeData?.HomeBanner1Title);
    updateInnerHTML("HomeBanner1Description", homeData?.HomeBanner1Description);
    updateInnerHTML("What_we_do_heading", homeData?.What_we_do_heading);
    updateInnerHTML("What_we_do_description", homeData?.What_we_do_description);
    updateInnerHTML("OurExpertise_heading", homeData?.OurExpertise_heading);
    updateInnerHTML("OurExpertise_description", homeData?.OurExpertise_description);
    updateInnerHTML("Our_approach_section_heading", homeData?.Our_approach_section_heading);
    updateInnerHTML("Our_approach_section_description", homeData?.Our_approach_section_description);
    updateInnerHTML("Client_logo_title", homeData?.Client_logo_title);
    updateInnerHTML("Client_logo_description", homeData?.Client_logo_description);
    updateInnerHTML("TestimonialsHeading", homeData?.TestimonialsHeading);
    updateInnerHTML("OurServices_heading", homeData?.OurServices_heading);
    updateInnerHTML("OurServices_description", homeData?.OurServices_description);
    updateInnerHTML("BlueStrip_title", homeData?.BlueStrip_title);
    updateInnerHTML("BlueStrip_description", homeData?.BlueStrip_description);
    updateInnerHTML("ContactUs_section_subheading", homeData?.ContactUs_section_subheading);
    updateInnerHTML("ContactUs_section_heading", homeData?.ContactUs_section_heading);
    updateInnerHTML("WhySectionTitle", homeData?.WhySectionTitle);
    updateInnerHTML("WhySectionSubHeading", homeData?.WhySectionSubHeading);
    updateInnerHTML("WhySectionDescription", homeData?.WhySectionDescription);
    updateInnerHTML("WhyList1", homeData?.WhyList1);
    updateInnerHTML("WhyList2", homeData?.WhyList2);
    updateInnerHTML("WhyList3", homeData?.WhyList3);
    updateInnerHTML("WhyList4", homeData?.WhyList4);
    updateInnerHTML("WhyList5", homeData?.WhyList5);
    updateInnerHTML("WhyList6", homeData?.WhyList6);
    updateInnerHTML("WhyList11", homeData?.WhyList1);
    updateInnerHTML("WhyList22", homeData?.WhyList2);
    updateInnerHTML("WhyList33", homeData?.WhyList3);
    updateInnerHTML("WhyList44", homeData?.WhyList4);
    updateInnerHTML("WhyList55", homeData?.WhyList5);
    updateInnerHTML("WhyList66", homeData?.WhyList6);
    updateInnerHTML("What_we_do_Mobile_description", homeData?.What_we_do_Mobile_description);
    updateInnerHTML("OurExpertise_MobileDescription", homeData?.OurExpertise_MobileDescription);
    updateInnerHTML("Our_approach_section_Mobile_description", homeData?.Our_approach_section_Mobile_description);
    updateInnerHTML("Client_logo_Mobile_description", homeData?.Client_logo_Mobile_description);
    updateInnerHTML("OurServices_Mobile_heading", homeData?.OurServices_Mobile_heading);
    updateInnerHTML("News_and_Updates_Title", homeData?.News_and_Updates_Title);
    updateInnerHTML("News_and_Updates_Description", homeData?.News_and_Updates_Description);
    updateInnerHTML("News_and_Updates_Title_Mobile", homeData?.News_and_Updates_Title_Mobile);


    const whySectionImgUrl = localizedData.WhySectionImg.data.attributes.url;

    const whySectionImgElementDesktop = document.getElementById('WhySectionImgDesktop');
    if (whySectionImgElementDesktop) {
        whySectionImgElementDesktop.src = whySectionImgUrl;
    } else {
        console.warn('WhySectionImgDesktop not found.');
    }

    const whySectionImgElementMobile = document.getElementById('WhySectionImgMobile');
    if (whySectionImgElementMobile) {
        whySectionImgElementMobile.src = whySectionImgUrl;
    } else {
        console.warn('WhySectionImgMobile not found.');
    }


    function populateClientLogos(clientLogosData) {
        const clientLogosDiv = document.getElementById('clientLogos');
        clientLogosDiv.innerHTML = '';  // Clear any existing content

        clientLogosData.forEach(logoData => {
            const logoImg = document.createElement('img');
            logoImg.src = logoData.attributes.url;
            logoImg.alt = '';  // You may want to provide alternative text if available
            clientLogosDiv.appendChild(logoImg);
        });
    }

    // Assuming localizedData is the object containing your data
    const clientLogosData = localizedData.client_logos.data;
    populateClientLogos(clientLogosData);
}

// Function to handle language change
async function handleLanguageChange(locale) {
    const localizedData = await fetchLocalizedData(locale);
    updateHomepageContent(localizedData);
}

// DOM content loaded event listener
document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the saved language from localStorage, default to 'en' if none is saved
    const savedLang = localStorage.getItem("selectedLocale") || "en";

    // Event listeners for language change
    document.querySelectorAll('.languageChange').forEach(dropdown => {
        dropdown.addEventListener('change', function () {
            const selectedLang = this.value;
            localStorage.setItem("selectedLocale", selectedLang);  // Save the selected language
            handleLanguageChange(selectedLang);  // Update content for the selected language
        });

        // Set the value of the dropdowns based on the saved language
        dropdown.value = savedLang;
    });

    // Initial content load
    handleLanguageChange(savedLang);  // Load content for the saved or default language
});


document.addEventListener('DOMContentLoaded', function () {

    const translations = {
        en: {
            videos: [
                {
                    "videoSrc": "assets/images/video/video1.webm",
                    "title": "Your next-Generation Patient Monitor, <br/> built on our technology platform",
                    "subTitle": "Our proven technologies offer features and specifications, guiding you seamlessly from concept to execution. We empower you to pioneer products at the forefront of technology and design.",
                    "para": "Stand by you!"
                },
                {
                    "videoSrc": "assets/images/video/video2.webm",
                    "title": "Your trusted design & development, <br/>and contract manufacturing Partner",
                    "subTitle": "We bring expertise, technology, and a commitment to quality to every stage of your project. From concept to delivery, we work hand-in-hand with you to ensure your medical device meets the highest standards of safety and performance. ",
                    "para": "Stand by you!"
                },
                {
                    "videoSrc": "assets/images/video/video3.webm",
                    "title": "Empowering you to build your own devices, <br/>We support the development and stand by you!",
                    "subTitle": "Unlock the potential to design your own devices with our platforms. We offer comprehensive services to guide you through the development process, putting you in control of creating customized solutions tailored to your specifications.",
                    "para": "Stand by you!"
                },
                {
                    "videoSrc": "assets/images/video/video4.webm",
                    "title": "Your medical technology development.. Simplified! <br/> On our proven ICU devices platforms.",
                    "subTitle": "Our proven product platforms and device design services are streamlined to provide innovative features. Our expert guidance, make your journey from product concept through regulatory to patient’s bedside effortlessly efficient.",
                    "para": "Stand by you!"
                }
            ]
        },
        fr: {
            videos: [
                {
                    "videoSrc": "assets/images/video/video1.webm",
                    "title": "Votre moniteur patient de nouvelle génération, <br/> construit sur notre plate-forme technologique",
                    "subTitle": "Nos technologies éprouvées offrent des fonctionnalités...",
                    "para": "À vos côtés !"
                },
                {
                    "videoSrc": "assets/images/video/video2.webm",
                    "title": "Votre partenaire de confiance en conception & développement, <br/>et en fabrication sous contrat",
                    "subTitle": "Nous apportons expertise, technologie et engagement en matière de qualité...",
                    "para": "À vos côtés !"
                },
                {
                    "videoSrc": "assets/images/video/video3.webm",
                    "title": "Vous permettant de créer vos propres appareils, <br/>Nous soutenons le développement et sommes à vos côtés !",
                    "subTitle": "Libérez le potentiel de concevoir vos propres appareils...",
                    "para": "À vos côtés !"
                },
                {
                    "videoSrc": "assets/images/video/video4.webm",
                    "title": "Votre développement de technologie médicale.. Simplifié ! <br/> Sur nos plateformes éprouvées de dispositifs de soins intensifs.",
                    "subTitle": "Nos plateformes de produits éprouvées et nos services de conception de dispositifs...",
                    "para": "À vos côtés !"
                }
            ]
        },
        es: {
            videos: [
                {
                    "videoSrc": "assets/images/video/video1.webm",
                    "title": "Su monitor de paciente de próxima generación, <br/> construido en nuestra plataforma tecnológica",
                    "subTitle": "Nuestras tecnologías probadas ofrecen características y especificaciones...",
                    "para": "¡Estamos contigo!"
                },
                {
                    "videoSrc": "assets/images/video/video2.webm",
                    "title": "Su socio de confianza en diseño & desarrollo, <br/>y fabricación por contrato",
                    "subTitle": "Aportamos experiencia, tecnología y un compromiso con la calidad...",
                    "para": "¡Estamos contigo!"
                },
                {
                    "videoSrc": "assets/images/video/video3.webm",
                    "title": "Empoderándote para construir tus propios dispositivos, <br/>Apoyamos el desarrollo y estamos contigo!",
                    "subTitle": "Desbloquea el potencial de diseñar tus propios dispositivos...",
                    "para": "¡Estamos contigo!"
                },
                {
                    "videoSrc": "assets/images/video/video4.webm",
                    "title": "Su desarrollo de tecnología médica.. ¡Simplificado! <br/> En nuestras plataformas de dispositivos de UCI probadas.",
                    "subTitle": "Nuestras plataformas de productos probadas y los servicios de diseño de dispositivos...",
                    "para": "¡Estamos contigo!"
                }
            ]
        },
        de: {
            videos: [
                {
                    "videoSrc": "assets/images/video/video1.webm",
                    "title": "Ihr Patientenmonitor der nächsten Generation, <br/> gebaut auf unserer Technologieplattform",
                    "subTitle": "Unsere bewährten Technologien bieten Funktionen und Spezifikationen...",
                    "para": "Wir stehen Ihnen bei!"
                },
                {
                    "videoSrc": "assets/images/video/video2.webm",
                    "title": "Ihr vertrauenswürdiger Partner für Design & Entwicklung, <br/>und Vertragsfertigung",
                    "subTitle": "Wir bringen Expertise, Technologie und ein Qualitätsversprechen...",
                    "para": "Wir stehen Ihnen bei!"
                },
                {
                    "videoSrc": "assets/images/video/video3.webm",
                    "title": "Ermächtigung zum Bau eigener Geräte, <br/>Wir unterstützen die Entwicklung und stehen Ihnen bei!",
                    "subTitle": "Erschließen Sie das Potenzial, Ihre eigenen Geräte zu entwerfen...",
                    "para": "Wir stehen Ihnen bei!"
                },
                {
                    "videoSrc": "assets/images/video/video4.webm",
                    "title": "Ihre medizinische Technologieentwicklung.. Vereinfacht! <br/> Auf unseren bewährten ICU-Geräteplattformen.",
                    "subTitle": "Unsere bewährten Produktplattformen und Geräte-Design-Dienstleistungen...",
                    "para": "Wir stehen Ihnen bei!"
                }
            ]
        },
        pt: {
            videos: [
                {
                    "videoSrc": "assets/images/video/video1.webm",
                    "title": "Seu monitor de paciente de próxima geração, <br/> construído em nossa plataforma tecnológica",
                    "subTitle": "Nossas tecnologias comprovadas oferecem recursos e especificações...",
                    "para": "Estamos com você!"
                },
                {
                    "videoSrc": "assets/images/video/video2.webm",
                    "title": "Seu parceiro confiável de design & desenvolvimento, <br/>e fabricação contratada",
                    "subTitle": "Trazemos expertise, tecnologia e um compromisso com a qualidade...",
                    "para": "Estamos com você!"
                },
                {
                    "videoSrc": "assets/images/video/video3.webm",
                    "title": "Empoderando você para construir seus próprios dispositivos, <br/>Apoiamos o desenvolvimento e estamos com você!",
                    "subTitle": "Desbloqueie o potencial de projetar seus próprios dispositivos...",
                    "para": "Estamos com você!"
                },
                {
                    "videoSrc": "assets/images/video/video4.webm",
                    "title": "Seu desenvolvimento de tecnologia médica.. Simplificado! <br/> Em nossas plataformas comprovadas de dispositivos de UTI.",
                    "subTitle": "Nossas plataformas de produtos comprovadas e serviços de design de dispositivos...",
                    "para": "Estamos com você!"
                }
            ]
        }
    };

    function updateContent(lang) {
        // Access the videos array for the selected language
        const videos = translations[lang].videos;
        // Get a random index from the videos array
        let randomIndex = Math.floor(Math.random() * videos.length);

        // Check if the previous index is stored in localStorage
        const lastIndex = localStorage.getItem('lastRandomIndex');

        // If the new random index is the same as the last, generate a new one
        while (videos.length > 1 && randomIndex == lastIndex) {
            randomIndex = Math.floor(Math.random() * videos.length);
        }

        // Store the new random index in localStorage
        localStorage.setItem('lastRandomIndex', randomIndex);

        // Get the HeroContainer element
        const heroContainer = document.querySelector('.HeroContainer');
        if (heroContainer) {
            const videoElement = heroContainer.querySelector('video');
            const titleElement = heroContainer.querySelector('#title');
            const subTitleElement = heroContainer.querySelector('#subTitle');
            const paraElement = heroContainer.querySelector('.heroContent p');

            // Use the random entry to populate the content
            const randomVideoData = videos[randomIndex];
            if (videoElement) videoElement.src = randomVideoData.videoSrc;
            if (titleElement) titleElement.innerHTML = randomVideoData.title;
            if (subTitleElement) subTitleElement.innerHTML = randomVideoData.subTitle;
            if (paraElement) paraElement.innerHTML = randomVideoData.para;
        }
    }

    // Event listener for language dropdowns
    const languageDropdowns = document.querySelectorAll('.languageChange');
    languageDropdowns.forEach(dropdown => {
        dropdown.addEventListener('change', function () {
            const selectedLanguage = this.value;
            localStorage.setItem('selectedLanguage', selectedLanguage);
            updateContent(selectedLanguage);
        });
    });

    // Get the language from localStorage or default to 'en'
    const storedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    updateContent(storedLanguage);

});
