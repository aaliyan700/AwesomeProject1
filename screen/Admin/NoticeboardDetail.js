import React, { useState, useEffect } from 'react';
import { View, Alert, ScrollView, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import { Button } from 'react-native-paper';
import IP from '../ip';
const NoticeboardDetail = ({ route }) => {
    const { title, des } = route.params;
    console.log(title, des);
    const [sectionList, setSectionList] = useState([]);
    const getSectionList = async () => {
        try {
            let query = `http://${IP}/StudentPortal/api/Admin/GetSectionList`;
            const response = await fetch(query, { method: 'GET' });
            const data = await response.json();
            setSectionList(data);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getSectionList();
    }, [])
    // const apiResponse = [
    //     {
    //         program: 'CS',
    //         semesters: [
    //             { no: 1, sections: ['A', 'B'] },
    //             { no: 2, sections: ['A', 'B', 'C'] },
    //             { no: 3, sections: ['A'] },
    //             { no: 4, sections: ['A', 'B', 'C'] },
    //             { no: 5, sections: ['A', 'B'] },
    //             { no: 6, sections: ['A'] },
    //             { no: 7, sections: ['A', 'B', 'C'] },
    //             { no: 8, sections: ['A'] },
    //         ],
    //     },
    //     {
    //         program: 'IT',
    //         semesters: [
    //             { no: 1, sections: ['A', 'B'] },
    //             { no: 2, sections: ['A', 'B', 'C'] },
    //             { no: 3, sections: ['A'] },
    //             { no: 4, sections: ['A', 'B', 'C'] },
    //             { no: 5, sections: ['A', 'B'] },
    //             { no: 6, sections: ['A'] },
    //             { no: 7, sections: ['A', 'B', 'C'] },
    //             { no: 8, sections: ['A'] },
    //         ],
    //     },
    // ];

    const [selectedPrograms, setSelectedPrograms] = useState([]);
    const [selectedSemesters, setSelectedSemesters] = useState([]);
    const [selectedSections, setSelectedSections] = useState([]);

    const handleProgramPress = (program) => {
        if (selectedPrograms.includes(program)) {
            setSelectedPrograms(selectedPrograms.filter((p) => p !== program));
        } else {
            setSelectedPrograms([...selectedPrograms, program]);
        }
    };
    const handleShowSelection = async () => {
        const selectedCheckboxes = [
            ...selectedPrograms,
            ...selectedSemesters.map((semester) => semester.split('-')[1]),
            ...selectedSections.map((section) => section.split('-')[2]),
        ];
        const noticeBoardData = {
            n: {
                title: title,
                description: des
            },
            slist: [{
                section: 'A',
                semester: 7,
                program: 'CS'
            }]
        }
        console.log(noticeBoardData);
        const response = await fetch(
            `http://${IP}/StudentPortal/api/admin/AddNoticeBoard`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(noticeBoardData)
        }
        );
        const data = await response.json();
        console.log(data);
        Alert.alert('Alert', data);
    };
    const handleSemesterPress = (program, semesterNo) => {
        if (selectedSemesters.includes(`${program}-${semesterNo}`)) {
            setSelectedSemesters(selectedSemesters.filter((sem) => sem !== `${program}-${semesterNo}`));
        } else {
            setSelectedSemesters([...selectedSemesters, `${program}-${semesterNo}`]);
        }
    };

    const handleSectionPress = (program, semesterNo, section) => {
        const key = `${program}-${semesterNo}-${section}`;
        if (selectedSections.includes(key)) {
            setSelectedSections(selectedSections.filter((sec) => sec !== key));
        } else {
            setSelectedSections([...selectedSections, key]);
        }
    };

    return (
        <ScrollView>
            <View>
                {sectionList.map((program) => (
                    <View key={program.program}>
                        <List.Item
                            title={program.program}
                            left={() => (
                                <CheckBox
                                    value={selectedPrograms.includes(program.program)}
                                    onValueChange={() => handleProgramPress(program.program)}
                                />
                            )}
                        />
                        {selectedPrograms.includes(program.program) && (
                            <View>
                                {program.semesters.map((semester) => (
                                    <View key={semester.no}>
                                        <List.Item
                                            title={`Semester ${semester.no}`}
                                            left={() => (
                                                <CheckBox
                                                    value={selectedSemesters.includes(`${program.program}-${semester.no}`)}
                                                    onValueChange={() => handleSemesterPress(program.program
                                                        , semester.no)}
                                                />
                                            )}
                                        />
                                        {selectedSemesters.includes(`${program.program}-${semester.no}`) && (
                                            <View>
                                                {semester.sections.map((section) => (
                                                    <List.Item
                                                        key={section}
                                                        title={section}
                                                        left={() => (
                                                            <CheckBox
                                                                value={selectedSections.includes(`${program.program}-${semester.no}-${section}`)}
                                                                onValueChange={() =>
                                                                    handleSectionPress(program.program, semester.no, section)
                                                                }
                                                            />
                                                        )}
                                                    />
                                                ))}
                                            </View>
                                        )}
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                ))}
                <View >

                    <Button onPress={handleShowSelection} mode="contained" style={styles.btn}>Submit</Button>
                </View>
            </View>
        </ScrollView>
    );
};

export default NoticeboardDetail;
const styles = StyleSheet.create({
    header:
    {
        marginHorizontal: 10,
        marginVertical: 20,
        padding: 10
    },
    inputDes:
    {
        height: 200
    },
    font:
    {
        textAlign: 'center',
        color: 'white',
        fontSize: 16
    },
    btn:
    {
        backgroundColor: '#099e78',
        marginHorizontal: 80,
        padding: 6,
        borderRadius: 10,
        marginVertical: 10
    }

})

// import React, { useState } from 'react';
// import { View, Button, Alert } from 'react-native';
// import { List } from 'react-native-paper';
// import CheckBox from '@react-native-community/checkbox';

// const NoticeboardDetail = () => {
//     const apiResponse = [
//         // Your data here
//     ];

//     const [selectedPrograms, setSelectedPrograms] = useState([]);
//     const [selectedSemesters, setSelectedSemesters] = useState([]);
//     const [selectedSections, setSelectedSections] = useState([]);

//     const handleProgramPress = (program) => {
//         if (selectedPrograms.includes(program)) {
//             setSelectedPrograms(selectedPrograms.filter((p) => p !== program));
//         } else {
//             setSelectedPrograms([...selectedPrograms, program]);
//         }
//     };

//     const handleSemesterPress = (program, semesterNo) => {
//         const key = `${program}-${semesterNo}`;
//         if (selectedSemesters.includes(key)) {
//             setSelectedSemesters(selectedSemesters.filter((sem) => sem !== key));
//         } else {
//             setSelectedSemesters([...selectedSemesters, key]);
//         }
//     };

//     const handleSectionPress = (program, semesterNo, section) => {
//         const key = `${program}-${semesterNo}-${section}`;
//         if (selectedSections.includes(key)) {
//             setSelectedSections(selectedSections.filter((sec) => sec !== key));
//         } else {
//             setSelectedSections([...selectedSections, key]);
//         }
//     };

//     const handleShowSelection = () => {
//         const selectedCheckboxes = [
//             ...selectedPrograms,
//             ...selectedSemesters,
//             ...selectedSections,
//         ];
//         Alert.alert('Selected Checkboxes', selectedCheckboxes.join(', '));
//     };

//     return (
//         <View style={{ flex: 1 }}>
//             {apiResponse.map((program) => (
//                 <View key={program.program}>
//                     <List.Item
//                         title={program.program}
//                         left={() => (
//                             <CheckBox
//                                 value={selectedPrograms.includes(program.program)}
//                                 onValueChange={() => handleProgramPress(program.program)}
//                             />
//                         )}
//                     />
//                     {selectedPrograms.includes(program.program) && (
//                         <View>
//                             {program.semesters.map((semester) => (
//                                 <View key={semester.no}>
//                                     <List.Item
//                                         title={`Semester ${semester.no}`}
//                                         left={() => (
//                                             <CheckBox
//                                                 value={selectedSemesters.includes(
//                                                     `${program.program}-${semester.no}`
//                                                 )}
//                                                 onValueChange={() =>
//                                                     handleSemesterPress(
//                                                         program.program,
//                                                         semester.no
//                                                     )
//                                                 }
//                                             />
//                                         )}
//                                     />
//                                     {selectedSemesters.includes(
//                                         `${program.program}-${semester.no}`
//                                     ) && (
//                                             <View>
//                                                 {semester.sections.map((section) => (
//                                                     <List.Item
//                                                         key={section}
//                                                         title={section}
//                                                         left={() => (
//                                                             <CheckBox
//                                                                 value={selectedSections.includes(
//                                                                     `${program.program}-${semester.no}-${section}`
//                                                                 )}
//                                                                 onValueChange={() =>
//                                                                     handleSectionPress(
//                                                                         program.program,
//                                                                         semester.no,
//                                                                         section
//                                                                     )
//                                                                 }
//                                                             />
//                                                         )}
//                                                     />
//                                                 ))}
//                                             </View>
//                                         )}
//                                 </View>
//                             ))}
//                         </View>
//                     )}
//                 </View>
//             ))}
//             <View style={{ marginTop: '70%' }}>
//                 <Button title="Show Selection" onPress={handleShowSelection} />
//             </View>
//         </View>
//     );
// };

// export default NoticeboardDetail;
