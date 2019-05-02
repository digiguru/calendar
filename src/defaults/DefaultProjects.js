const formatDate = function(date) {
    return date.toISOString().split('T')[0]
}
export const Defaults = {
    ProjectUsers: [
        {
          person: 'Adam',
          capacity: 0.5,
          project:'Nav'
        },
        {
          person: 'Adam',
          capacity: 0.5,
          project:'Early'
        },
        {
          person: 'Gabi',
          capacity: 1,
          project:'Late'
        },
        {
          person: 'Onisim',
          capacity: 0.5,
          project:'Early'
        },
        {
          person: 'Onisim',
          capacity: 0.5,
          project:'Late'
        }
      ],
  Projects: [
    {
      name: "Nav",
      efficency: "60%",
      capacity: "0.5",
      estimate: 4,
      startDate: formatDate(new Date(2019, 2, 1)),
      readyDate: formatDate(new Date(2019, 3, 28))
    },
    {
      name: "Early",
      efficency: "80%",
      capacity: "0.5",
      estimate: 4,
      startDate: formatDate(new Date(2019, 2, 1)),
      readyDate: formatDate(new Date(2019, 3, 28))
    },
    {
      name: "Late",
      efficency: "40%",
      capacity: "0.5",
      estimate: 4,
      startDate: formatDate(new Date(2019, 2, 1)),
      readyDate: formatDate(new Date(2019, 3, 28))
    }
    ]
} 