import React, { useState, useEffect } from 'react';
import { View, Alert, ScrollView, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import { Button, Divider } from 'react-native-paper';
import IP from '../ip';
import { calendarFormat } from 'moment';
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
    const [selectedPrograms, setSelectedPrograms] = useState([]);
    const [selectedSemesters, setSelectedSemesters] = useState([]);
    const [selectedSections, setSelectedSections] = useState([]);
    const [finalData, setFinalData] = useState([])
    console.log(finalData, 'finalData')
    const handleProgramPress = (program) => {
        console.log(program, 'prgram')
        if (selectedPrograms.includes(program)) {
            setSelectedPrograms(selectedPrograms.filter((p) => p !== program));
        } else {
            setSelectedPrograms([...selectedPrograms, program]);
        }
    };
    const handleShowSelection = async () => {

        const selectedCheckboxes = [
            ...selectedSemesters.map((semester) => semester),
            ...selectedSections.map((section) => section.split('-')[2]),
        ];
        console.log("first", selectedCheckboxes);
        const noticeBoardData = {
            n: {
                title: title,
                description: des
            },
            slist: finalData
        };
        // selectedPrograms.forEach((program) => {
        //     selectedSemesters.forEach((semesterValue) => {
        //         //const filteredSection = selectedSections.filter((sectionValue) => sectionValue.startsWith(`${program}-${semesterValue}`));
        //         const filteredSection = selectedSections
        //         console.log(filteredSection, "///")
        //         noticeBoardData.slist.push({
        //             section: filteredSection.map((sectionValue) => sectionValue.split('-')[2]),
        //             semester: parseInt(semesterValue.split('-')[1]),
        //             program: program
        //         });
        //         console.log("<<<<<<??", noticeBoardData.slist);
        //     });
        // });
        response = await fetch(
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
    console.log(selectedSemesters, 'semester')
    const handleSectionPress = (program, semesterNo, section) => {
        const key = `${program}-${semesterNo}-${section}`;
        if (selectedSections.includes(key)) {
            setSelectedSections(selectedSections.filter((sec) => sec !== key));
        } else {
            setSelectedSections([...selectedSections, key]);
        }
        const existingDataIndex = finalData.findIndex(
            (data) => data.program === program && data.semester === semesterNo
        );

        if (existingDataIndex !== -1) {
            // Program and semester already exist in finalData
            const newData = finalData[existingDataIndex];
            if (newData.section.includes(section)) {
                // Remove section from the array
                newData.section = newData.section.filter((sec) => sec !== section);
                if (newData.section.length === 0) {
                    // Remove the object if section array becomes empty
                    const updatedFinalData = finalData.filter(
                        (data, index) => index !== existingDataIndex
                    );
                    setFinalData(updatedFinalData);
                } else {
                    const updatedFinalData = [...finalData];
                    updatedFinalData[existingDataIndex] = newData;
                    setFinalData(updatedFinalData);
                }
            } else {
                // Add section to the array
                newData.section.push(section);
                const updatedFinalData = [...finalData];
                updatedFinalData[existingDataIndex] = newData;
                setFinalData(updatedFinalData);
            }
        } else {
            // Program and semester do not exist in finalData
            setFinalData((prevData) => [
                ...prevData,
                {
                    program: program,
                    semester: semesterNo,
                    section: [section]
                }
            ]);
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
                        <Divider></Divider>
                        {selectedPrograms.includes(program.program) && (
                            <View>
                                {program.semesters.map((semester) => (
                                    <View key={semester.no} style={{ marginLeft: 30 }}>
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
                                        <Divider></Divider>
                                        {selectedSemesters.includes(`${program.program}-${semester.no}`) && (
                                            <View style={{ marginLeft: 30 }}>
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
