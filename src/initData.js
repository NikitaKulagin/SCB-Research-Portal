// initData.js

const initialResearchData = [
    {
        id: 1,
        title: 'Макромонитор 2025.02.03',
        domain: 'Макромонитор',
        periodicity: 'Еженедельное',
        date: '2025-02-03',
        pdfUrl: `${process.env.PUBLIC_URL}/pdfs/Макромонитор 2025.02.03.pdf`,
        thumbnailUrl: `${process.env.PUBLIC_URL}/thumbnails/Макромонитор 2025.02.03.png`,
      },
      {
        id: 2,
        title: 'Рынок пшеницы Февраль 2025',
        domain: 'Зерновые',
        periodicity: 'Ежеквартальное',
        date: '2025-02-05',
        pdfUrl: `${process.env.PUBLIC_URL}/pdfs/Рынок пшеницы 2025.02.01.pdf`,
        thumbnailUrl: `${process.env.PUBLIC_URL}thumbnails/Рынок пшеницы 2025.02.01.png`,
      },
  ];
  
  export default initialResearchData;