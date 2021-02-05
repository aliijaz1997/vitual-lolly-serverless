// // const path = require(`path`)

// exports.createPages = async ({ actions, graphql }) => {
//     const { data } = await graphql(`
//   query MyQuery {
//     lollybylink {
//       getVCard {
//         c1
//         c2
//         c3
//         id
//         link
//         msg
//         rec
//         sender
//       }
//     }
//   }
  
//   `)

// //     console.log("The data from the node js query ",data)
// //     data.LOLLIES.getAllLollies.forEach(({ lollyPath }) => {
// //         actions.createPage({
// //             path: `lolly/${lollyPath}`,
// //             component: path.resolve(`./src/components/dynamicLollyPage.tsx`),
// //             context: {
// //                 lollyPath: lollyPath,
// //             },
// //         })
// //     })

// }