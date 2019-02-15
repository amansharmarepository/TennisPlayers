import React, { Component } from 'react';
import {
  Platform, StyleSheet, Image, Text, View, FlatList, SafeAreaView, StatusBar,
  TouchableOpacity, YellowBox
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

let statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

export default class App extends Component {
  constructor() {
    super();
    YellowBox.ignoreWarnings(
      ['Waring: isMounted(...) is deprecated', 'ListView is deprecated', 'Remote debugger'
      ]);
    this.state = {
      options: [
        {
          name: 'Roger Federer',
          gender: 'Male',
          skill: 'Advance'
        },
        {
          name: 'Serena Williams',
          gender: 'Female',
          skill: 'Advance'
        },
        {
          name: 'Rafael Nadal',
          gender: 'Male',
          skill: 'Advance'
        },
        {
          name: 'Steffi Graf',
          gender: 'Female',
          skill: 'Advance'
        },
        {
          name: 'Novak Djokovic',
          gender: 'Male',
          skill: 'Intermediate'
        },
        {
          name: 'Pete Sampras',
          gender: 'Male',
          skill: 'Beginner'
        },
        {
          name: 'Martina Navratilova',
          gender: 'Female',
          skill: 'Intermediate'
        },
        {
          name: 'Venus Williams',
          gender: 'Female',
          skill: 'Beginner'
        },
      ],
      filters: ["All", "Gender", "   Male", "   Female", "Skills", "   Beginner", "   Intermediate", "   Advance"],
      selectedFilter: 0,
      filtered: [],
      value: 'Select',
    }
  }

  componentDidMount() {
    this.setState({ filtered: this.state.options })
  }

  code_dropdown_renderRow = (rowData, rowID, highlighted) => {
    return (
      <TouchableOpacity underlayColor='silver'>
        <View style={{ width: '100%', flexDirection: 'row', height: 36, alignItems: 'center', backgroundColor: '#FDFEFE' }}>
          <Text style={{
            fontSize: 16, color: 'black', width: '100%',
            padding: 8
          }}>{`${rowData}`}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  dropdown_onSelect(idx, value) {
    if (idx > 1) {
      this.setState({ selectedFilter: idx });
      if (idx == 2 || idx == 3) {
        this.filterGender(idx)
      } else if (idx >= 5 && idx <=7) {
          this.setState({ filtered: this.state.options })
        setTimeout(() => {
          this.filterSkills(idx)
        })
      } else {
        this.setState({ filtered: this.state.options })
      }
    } else {
      this.setState({ filtered: this.state.options })
    }
  }

  filterGender(index) {
    const { options } = this.state;
    let arrMale = [], arrFemale = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].gender === "Male") {
        arrMale.push(options[i]);
      } else {
        arrFemale.push(options[i]);
      }
    }
    let filtered = []
    if (index == 2) {
      filtered = arrMale
    } else {
      filtered = arrFemale
    }
    this.setState({ filtered })
  }

  filterSkills(index) {
    const { options, filtered } = this.state;
    let arrExpert = [], arrIntermediate = [], arrbeginner = [];
    for (let i = 0; i < filtered.length; i++) {
      if (filtered[i].skill === "Advance") {
        arrExpert.push(filtered[i]);
      } else if (filtered[i].skill === "Intermediate") {
        arrIntermediate.push(filtered[i]);
      } else {
        arrbeginner.push(filtered[i])
      }
    }
    let arrFiltered = [];
    if (index == 5) {
      arrFiltered = arrbeginner
    } else if (index == 6) {
      arrFiltered = arrIntermediate
    } else {
      arrFiltered = arrExpert
    }
    this.setState({ filtered: arrFiltered })
  }

  _renderItem = (item, index) => {
    let data = item.item;
    return (
      <View style={styles.viewStyle}>
        <View style={{ padding: 8, flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require("./assets/user_image.png")}
            style={{ width: 44, height: 44, borderRadius: 44 / 2 }} />
          <View style={{ marginLeft: 12 }}>
            <Text style={[styles.textStyle, { fontWeight: 'bold' }]}>{data.name}</Text>
            <View style={{ flexDirection: 'row' }} >
              <Text style={styles.textStyle}>{"Gender : "}</Text>
              <Text style={styles.textStyle}>{data.gender}</Text>
            </View>
            <View style={{ flexDirection: 'row' }} >
              <Text style={styles.textStyle}>{"Skill : "}</Text>
              <Text style={styles.textStyle}>{data.skill}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  render() {
    const { options, filters, selectedFilter, filtered, value } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={{
          width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'grey',
          height: Platform.OS === 'ios' ? 52 : 44
        }}>
          <Text style={[styles.textStyle, { color: 'white', fontWeight: 'bold', fontSize: 18 }]}>{"Tennis Players"}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', width: '90%', marginTop: 8, alignItems: 'center', 
          alignSelf: 'center' }}>
            <Text style={styles.textStyle}>Filter : </Text>
            <TouchableOpacity style={{ flexDirection: 'row', width: '100%', padding: 4, marginLeft: 12, alignItems: 'center' }}
              onPress={() => this.refs.dropdown.show()}>
              <ModalDropdown options={filters}
                ref='dropdown'
                defaultValue={'All'}
                defaultIndex={parseInt(selectedFilter)}
                style={styles.dropdownViewStyle}
                textStyle={{ color: 'black', fontSize: 16, marginRight: 10, marginTop: 4, marginBottom: 4, textAlign: 'center' }} //default selected box text style
                dropdownStyle={[styles.dropdownStyle, { height: 36 * filters.length + 4 }]}
                dropdownTextStyle={styles.dropdownTextStyle}
                renderRow={this.code_dropdown_renderRow.bind(this)}
                onSelect={(idx, value) => this.dropdown_onSelect(idx, value)} />
              <Image source = {require("./assets/drop.png")}/>
            </TouchableOpacity>
          </View>
          <FlatList
            extraData={this.state}
            data={filtered}
            keyExtractor={(item, index) => index + ""}
            renderItem={this._renderItem} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    width: '100%'
  },
  viewStyle: {
    width: '90%', borderWidth: 0.8, borderColor: 'grey', margin: 8,
    alignSelf: 'center', justifyContent: 'center', borderRadius: 4
  },
  textStyle: {
    fontSize: 16,
    color: 'black'
  },
  dropdownStyle: {
    marginTop: Platform.OS === 'ios' ? 4 : -16,
    width: "44%",
    borderColor: 'grey',
    borderWidth: 0.8,
    alignItems: 'center',
  },
  dropdownViewStyle: {
    alignItems: 'center'
  },
  dropdownTextStyle: {
    fontSize: 16, color: 'black', textAlign: 'center'
  },
});
