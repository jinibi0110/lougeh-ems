<!--template>
<div>
  <v-data-table
    :headers="headers"
    :items="subjects"
    sort-by="subjectid"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-dialog v-model="dialog" scrollable-max-height="800px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row >
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.subjectid" label="Subject Code"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.subjectdesc" label="Subject Description"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.creditpoints" label="Credit Points"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.status" label="Status"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        edit
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</div>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Subject Code',
          align: 'left',
          sortable: false,
          value: 'subjectid',
        },
        { text: 'Subject Description', align: 'left', value: 'subjectdesc' },
        { text: 'Credit Points', align: 'left', value: 'creditpoints' },
        { text: 'Status', align: 'left', value: 'status' },
        { text: 'Actions', align: 'left', value: 'action', sortable: false },
      ],
      accounts: [],
      editedIndex: -1,
      editedItem: {
        subjectid: '',
        subjectdesc: '',
        creditpoints: 0,
        status: 0,
      },
      defaultItem: {
        sy: '',
        semester: '',
        creditpoints: null,
        status: 'Active',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Add Subject' : 'Edit Details'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.subjects = [
          {
            subjectid: 'IT111',
            subjectdesc: 'Digital Techniques and Fundamentals',
            creditpoints: 3,
            status: 'Active',
          },
          {
            subjectid: 'IT171',
            subjectdesc: 'Software Engineering',
            creditpoints: 3,
            status: 'Active',
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.subjects.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.subjects[this.editedIndex], this.editedItem)
        } else {
          this.subjects.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>
-->