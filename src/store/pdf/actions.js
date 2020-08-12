import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"
pdfMake.vfs = pdfFonts.pdfMake.vfs
import { numeroALetras, calcExp, currency, dateExplode } from 'src/helpers'

export const printPdf = (ctx, data) => {
  let stack = []
  let initDate = calcExp(data.expMonth, data.expDay)

  for (let i = 1; i <= data.quantity; i++) {
    stack = stack.concat(
      {
        unbreakable: true,
        style: 'wrapper',
        table: {
          pageBreak: 'after',
          widths: ['*'],
          body: [
            [
              {
                table: {
                  widths: ['*', 60, 15, 15, 60, 15, 40],
                  body: [
                    [
                      { text: 'Sellado ', border: [false, false]},
                      { text: 'Vence el ', border: [false, false], alignment: 'right' },
                      { text: initDate.format('DD'), border: [false, false], bold: true, alignment: 'center' },
                      { text: 'de', border: [false, false], alignment: 'center' },
                      { text: initDate.format('MMMM').toUpperCase(), border: [false, false], bold: true, alignment: 'center' },
                      { text: 'de', border: [false, false], alignment: 'center' },
                      { text: initDate.format('YYYY'), border: [false, false], bold: true, alignment: 'center' }
                    ]
                  ]
                },
                border: [false, true, false, false],
                margin: [0, 0, 0, 0],
                style: 'minTable',
              }
            ],
            [
              {
                table: {
                  widths: [100, '*', 100],
                  body: [
                    [
                      { text: 'Nº: ' + i + '/' + data.quantity, border: [false, false] },
                      { text: ' ', border: [false, false] },
                      { text: 'Son $ ' + currency(data.amount) + '.-', alignment: 'right', border: [false, false] }
                    ]
                  ]
                },
                border: [false, false, false, false],
                margin: [0, 10, 0, 0],
                style: 'headTable',
              }
            ],
            [
              {
                table: {
                  widths: ['*', 40, '*', 40, '*'],
                  body: [
                    [
                      { text: dateExplode(data.currentDate).day, border: [false, false, false, true], fillColor: '#cccccc', alignment: 'center' },
                      { text: ' de ', border: [false, false], alignment: 'center' },
                      { text: dateExplode(data.currentDate).month.toUpperCase(), border: [false, false, false, true], fillColor: '#cccccc', alignment: 'center' },
                      { text: ' de ', border: [false, false], alignment: 'center' },
                      { text: dateExplode(data.currentDate).year, border: [false, false, false, true], fillColor: '#cccccc', alignment: 'center' },
                    ]
                  ]
                },
                border: [false, false],
                style: 'defTable'
              },
            ],
            [
              {
                table: {
                  widths: [280, '*'],
                  body: [
                    [
                      { text: (data.firstName + ' ' + data.lastName).toUpperCase(), border: [false, false, false, true], alignment: 'center', fillColor: '#cccccc' },
                      { text: ' pagaré sin protesto (Art. 50 Ley 123)', border: [false, false], },
                    ]
                  ]
                },
                border: [false, false],
                style: 'defTable'
              },
            ],
            [
              {
                table: {
                  widths: [90, '*'],
                  body: [
                    [
                      { text: ' La cantidad de  ', border: [false, false] },
                      { text: '--' +  numeroALetras(data.amount, data.currency).trim() + '--', border: [false, false, false, true], fillColor: '#ccc', alignment: 'center' },
                    ]
                  ]
                },
                border: [false, false],
                style: 'defTable',
              },
            ],
            [
              {
                table: {
                  widths: [140, '*', 120],
                  body: [
                    [
                      { text: ' Por igual valor recibido en ', border: [false, false] },
                      { text: String(data.product).toUpperCase(), border: [false, false, false, true], fillColor: '#ccc', alignment: 'center' },
                      { text: ' a entera satisfacción ', border: [false, false] }
                    ]
                  ]
                },
                border: [false, false],
                style: 'defTable',
              },
            ],
            [
              {
                table: {
                  widths: [90, 150],
                  body: [
                    [
                      { text: ' Pagadero en ', border: [false, false], margin: [0, 12, 0, 0] },
                      { text: ' Larroque 123 ', border: [false, false, false, true], margin: [0, 12, 0, 0] }
                    ],
                  ]
                },
                border: [false, false],
                style: 'minTable',
              },
            ],
            [
              {
                table: {
                  widths: [90, 150],
                  body: [
                    [
                      { text: ' Firmante ', border: [false, false] },
                      { text: data.firstName.toUpperCase() + ' ' + data.lastName.toUpperCase(), border: [false, false, false, true] }
                    ],
                  ]
                },
                border: [false, false],
                style: 'minTable',
              },
            ],
            [
              {
                table: {
                  widths: [90, 150],
                  body: [
                    [
                      { text: ' DNI / CUIT ', border: [false, false] },
                      { text: data.document, border: [false, false, false, true] }
                    ],
                  ]
                },
                border: [false, false],
                style: 'minTable',
              },
            ],
            [
              {
                table: {
                  widths: [90, 150],
                  body: [
                    [
                      { text: ' Domicilio ', border: [false, false] },
                      { text: data.address1.toUpperCase(), border: [false, false, false, true] }
                    ],
                  ]
                },
                border: [false, false],
                style: 'minTable',
              },
            ],
            [
              {
                table: {
                  widths: [90, 150],
                  body: [
                    [
                      { text: ' Localidad ', border: [false, false] },
                      { text: data.address2.toUpperCase(), border: [false, false, false, true] }
                    ],
                  ]
                },
                border: [false, false],
                style: 'minTable',
              },
            ],
            [
              {
                table: {
                  widths: [90, 150],
                  body: [
                    [
                      { text: ' Provincia ', border: [false, false] },
                      { text: data.address3.toUpperCase(), border: [false, false, false, true] }
                    ],
                  ]
                },
                border: [false, false],
                style: 'minTable',
              },
            ],
            [
              {
                table: {
                  widths: [90, 150],
                  body: [
                    [
                      { text: ' Teléfono ', border: [false, false] },
                      { text: data.phone, border: [false, false, false, true] }
                    ],
                  ]
                },
                border: [false, false, false, true],
                margin: [0, 0, 0, 15],
                style: 'minTable',
              },
            ]
          ]
        }
      }
    )
    initDate = initDate.add(1, 'month')
  }
  const dd = {
    pageMargins: [30, 40],
    content: [{
      stack
    }],
    styles: {
      wrapper: {
        border: [true, true],
        margin: [0, 20],
      },
      minTable: {
        fontSize: 10
      },
      defTable: {
        fontSize: 11,
      },
      headTable: {
        fontSize: 14,
        margin: [5, 0, 5, 10]
      }
    }
  }
  pdfMake.createPdf(dd).open()
}
